import { useAuth as useOidcAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";

import { environment } from "@config";

export function useAuth() {
  const auth = useOidcAuth();
  const { i18n } = useTranslation();

  const login = () => {
    auth.signinRedirect({
      extraQueryParams: {
        lang: i18n.resolvedLanguage,
      },
    });
  };

  const logout = () =>
    auth.signoutRedirect({
      extraQueryParams: {
        client_id: environment.cognito.clientId,
        logout_uri: environment.cognito.logoutUri,
      },
    });

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    user: auth.user,
    login,
    logout,
  };
}
