import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/", { replace: true });
      toast.success("Successfully logged in");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Invalid credentials");
    },
  });

  return { login, isLoading };
}
