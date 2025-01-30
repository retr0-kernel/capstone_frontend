import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

const Login = () => {
    const { googleLogin, isAuthenticated, isLoading } = useAuth()

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }
    // console.log(import.meta.env.VITE_FRONTEND_URL)
    // console.log(import.meta.env.VITE_BACKEND_URL)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl flex flex-col justify-center content-center p-6">
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl sm:text-3xl mb-6 font-bold text-gray-900">Capstone</h2>
                    <img src="/Logo-2.png" alt="CapStone Logo" className="w-2/3 max-w-[200px]" />
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={googleLogin}
                        disabled={isLoading}
                        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="whitespace-nowrap">Login with Google</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login

