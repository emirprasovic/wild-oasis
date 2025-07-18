import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return error?.message;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1) Update password or fullname
  let updateData;
  if (password) {
    updateData = { password };
  } else if (fullName) {
    updateData = { data: { fullName } };
  }

  let { data, error } = await supabase.auth.updateUser(updateData);
  if (!avatar) return data;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // 2) Upload avatar if specified
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    console.error(uploadError);
    throw new Error(uploadError.message);
  }

  // 3) Update avatar in user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    console.error(updateError);
    throw new Error(updateError.message);
  }

  return updatedUser;
}
