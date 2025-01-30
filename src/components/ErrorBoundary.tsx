import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    const error = useRouteError()

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600">
                    {error instanceof Error ? error.message : 'An unexpected error occurred'}
                </p>
            </div>
        </div>
    )
}

export default ErrorBoundary