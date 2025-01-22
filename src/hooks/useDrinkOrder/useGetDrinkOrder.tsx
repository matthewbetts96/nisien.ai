import apiClient from "api/api";
import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetDrinkOrder = () => {
  return useQuery({
    queryKey: ["DrinkOrder"],
    queryFn: async (): Promise<any> => {
      const response = await apiClient.get("/DrinkOrder");
      return await response.data;
    },
    staleTime: STALE_TIME,
  });
};
