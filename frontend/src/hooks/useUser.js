import { useQuery } from "@tanstack/react-query";

import { getMyInfoApi } from "../api/userApi";

// watchlist query
export function useMyInfo() {
  const {
    data: myInfo,
    error,
    status,
  } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfoApi,
  });

  return { myInfo, error, status };
}

