import { useMutation } from "@tanstack/react-query";
import apiClient from "api/api";

export const useUpdateDrinkRun = () => {
  return useMutation({
    mutationFn: async (newRun: any): Promise<any> => {
      const response = await apiClient.post("/DrinkRun", newRun);
      return response.data;
    },
  });
};
