import apiClient from "api/api";
import { STALE_TIME } from "../../constants";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<any> => {
      const response = await apiClient.get("/Users");
      return await response.data;
    },
    staleTime: STALE_TIME,
  });
};
