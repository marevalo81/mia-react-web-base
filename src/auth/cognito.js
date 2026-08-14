import { environment } from '../config';

export const cognitoConfig = {
    authority: environment.cognito.authority,
    client_id: environment.cognito.clientId,
    redirect_uri: environment.cognito.redirectUri,
    post_logout_redirect_uri: environment.cognito.logoutUri,
    response_type: 'code',
    scope: 'openid email'
};