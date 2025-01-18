import { useMutation } from "@tanstack/react-query";
import apiClient from "api/api";

export const useUpdateDrinkOrder = () => {
  return useMutation({
    mutationFn: async (newOrder: any): Promise<any> => {
      const response = await apiClient.post("/v1/Users", newOrder);
      return response.data;
    },
  });
};
