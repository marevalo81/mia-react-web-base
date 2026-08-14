import { useQuery } from "@tanstack/react-query";

import { useApi } from "@api/useApi";
import { environment } from "@config";

export function useHealth() {
  console.log("environment.api.baseUrl", environment.api.baseUrl);
  const api = useApi(environment.api.baseUrl);

  return useQuery({
    queryKey: ["health"],
    queryFn: () => api.get("/health"),
    enabled: false,
  });
}
