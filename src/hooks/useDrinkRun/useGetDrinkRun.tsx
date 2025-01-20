import apiClient from "api/api";
import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetDrinkRun = () => {
  return useQuery({
    queryKey: ["DrinkRun"],
    queryFn: async (): Promise<any> => {
      const response = await apiClient.get("/DrinkRun");
      return await response.data;
    },
    staleTime: STALE_TIME,
  });
};
