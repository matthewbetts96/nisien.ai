import { useMutation } from "@tanstack/react-query";
import apiClient from "api/api";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUser: any): Promise<any> => {
      const response = await apiClient.post("/Users", newUser);
      return response.data;
    },
  });
};
