import {  Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {


    return (

        <div className="min-h-screen">
            <Navbar/>

            <main className="flex h-screen items-center justify-center">
                <Outlet />
            </main>
            
        </div>
    )
}

export default Layout