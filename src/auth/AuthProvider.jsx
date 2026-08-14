import { AuthProvider as OidcAuthProvider } from 'react-oidc-context';
import { cognitoConfig } from './cognito';

export function AuthProvider({ children }) {
    return (
        <OidcAuthProvider
            {...cognitoConfig}
            onSigninCallback={() => {
                window.history.replaceState(
                    {},
                    document.title,
                    '/'
                );
            }}
        >
            {children}
        </OidcAuthProvider>
    );
}