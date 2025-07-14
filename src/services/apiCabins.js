import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Supabase Cabins Error");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Supabase Cabin Deletion Error");
  }
}

export async function createEditCabin(newCabin, id) {
  // console.log("FROM API", newCabin, id);
  // https://gygoirdiysfdkvrexfur.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query;

  // A) Create Cabin
  if (!id) {
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit Cabin
  if (id) {
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(`Supabase Cabin ${id ? "Edit" : "Creation"} Error`);
  }
  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Supabase Cabin Image Upload Error");
  }

  return data;
}
