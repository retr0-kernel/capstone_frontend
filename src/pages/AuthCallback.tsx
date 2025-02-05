import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';


export function AuthCallback() {
    const [searchParams] = useSearchParams();
    const { handleAuthCallback } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            
            handleAuthCallback(token);
            navigate('/')
        } else {
            console.error('No token received');
            navigate('/login');
        }
    }, [searchParams, handleAuthCallback, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2"><Loading/></h2>
                <p className="text-gray-600">Please wait while we complete your login.</p>
            </div>
        </div>
    );
}
