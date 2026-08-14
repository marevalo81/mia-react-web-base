import packageJson from "../../package.json";

export const environment = {
  appEnv: import.meta.env.VITE_APP_ENV,

  cognito: {
    authority: import.meta.env.VITE_COGNITO_AUTHORITY,
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
    logoutUri: import.meta.env.VITE_COGNITO_LOGOUT_URI,
  },

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
};

export const appConfig = {
  version: packageJson.version,
};
