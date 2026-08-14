import { useEffect } from 'react';
import { AppRouter } from './routes';
import { useAuth } from '@auth';

function App() {
    const {
        isAuthenticated,
        isLoading,
        error,
        login
    } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !error) {
            login();
        }
    }, [isLoading, isAuthenticated, error, login]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error de autenticación: {error.message}</div>;
    }

    if (!isAuthenticated) {
        return <div>Redirigiendo al inicio de sesión...</div>;
    }

    return <AppRouter />;
}

export default App;