import { useMemo } from "react";

import { useAuth } from "@auth/useAuth";
import { createAxiosInstance } from "./axiosInstance";

export function useApi(baseURL) {
  const { user } = useAuth();

  const api = useMemo(() => createAxiosInstance(baseURL), [baseURL]);

  const request = async (config) => {
    const token = user?.id_token;

    const response = await api.request({
      ...config,
      headers: {
        ...config.headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    });

    return response.data;
  };

  const get = (url, config = {}) =>
    request({
      ...config,
      method: "GET",
      url,
    });

  const post = (url, data, config = {}) =>
    request({
      ...config,
      method: "POST",
      url,
      data,
    });

  const put = (url, data, config = {}) =>
    request({
      ...config,
      method: "PUT",
      url,
      data,
    });

  const patch = (url, data, config = {}) =>
    request({
      ...config,
      method: "PATCH",
      url,
      data,
    });

  const remove = (url, config = {}) =>
    request({
      ...config,
      method: "DELETE",
      url,
    });

  return {
    get,
    post,
    put,
    patch,
    delete: remove,
  };
}
