import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // We call reset() here, and not in onSubmit because WE ONLY WANT TO RESET THE FORM ON SUCCESS
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
