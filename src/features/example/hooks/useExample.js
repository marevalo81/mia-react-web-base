import { useMutation } from "@tanstack/react-query";

import { useApi } from "@api/useApi";
import { environment } from "@config";

export function useExample() {
  const api = useApi(environment.api.baseUrl);

  const sayHello = useMutation({
    mutationFn: (name) =>
      api.post("/example", {
        name,
      }),
  });

  return {
    sayHello,
  };
}
