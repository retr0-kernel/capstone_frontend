import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated, logout } = useAuth()

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <div className="min-h-screen">
            <nav className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold">
                                CapStone
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                            {isAuthenticated && (
                                <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                            )}
                            {!isAuthenticated ? (
                                <Link to="/login" className="hover:text-gray-300">Login</Link>
                            ) : (
                                <button
                                    onClick={() => logout()}
                                    className="hover:text-gray-300"
                                >
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-white">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                                    to="/"
                                    className="block px-3 py-2 rounded-md hover:bg-gray-700"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                                {isAuthenticated && (
                                    <Link
                                        to="/dashboard"
                                        className="block px-3 py-2 rounded-md hover:bg-gray-700"
                                        onClick={toggleMenu}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {!isAuthenticated ? (
                                    <Link
                                        to="/login"
                                        className="block px-3 py-2 rounded-md hover:bg-gray-700"
                                        onClick={toggleMenu}
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            logout()
                                            toggleMenu()
                                        }}
                                        className="w-full text-left block px-3 py-2 rounded-md hover:bg-gray-700"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <main className="flex h-screen items-center justify-center">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout