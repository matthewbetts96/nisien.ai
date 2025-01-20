import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersById = (id: number) => {
  return useQuery({
    queryKey: ["usersById"],
    queryFn: async (): Promise<any> => {
      const response = await fetch(`/Users/${id}`);
      return await response.json();
    },
    staleTime: STALE_TIME,
  });
};
