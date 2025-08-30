import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "Logout Success!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Signout
    </button>
  );
};
export default SignOutButton;
