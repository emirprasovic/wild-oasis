import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log("New user: ", user);
      toast.success(
        "User successfully created. Please verify the new user's email address"
      );
    },
  });

  return { signup, isLoading };
}
