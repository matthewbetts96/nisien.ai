import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetDrinkOrderById = (id: number) => {
  return useQuery({
    queryKey: ["DrinkOrderById"],
    queryFn: async (): Promise<any> => {
      const response = await fetch(`/DrinkOrder/${id}`);
      return await response.json();
    },
    staleTime: STALE_TIME,
  });
};
