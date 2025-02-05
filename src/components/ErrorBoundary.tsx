import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    const error = useRouteError()

    return (
        <section className="h-screen flex items-center content-center justify-center p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-6xl dark:text-gray-400">
                        <p className="text-gray-600">
                            {error instanceof Error ? error.message : 'An unexpected error occurred'}
                        </p>
                    </h2>
                    <p className="text-2xl mb-10 font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-blue-500 dark:text-gray-50">Back to homepage</a>
                </div>
            </div>
        </section>
    )
}

export default ErrorBoundary