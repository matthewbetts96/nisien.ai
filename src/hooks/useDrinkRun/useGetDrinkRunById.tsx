import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetDrinkRunById = (id: number) => {
  return useQuery({
    queryKey: ["DrinkRunById"],
    queryFn: async (): Promise<any> => {
      const response = await fetch(`/v1/DrinkRun/${id}`);
      return await response.json();
    },
    staleTime: STALE_TIME,
  });
};
