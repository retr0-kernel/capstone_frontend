import { useAuth } from "../hooks/useAuth"

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>
            <p className="mt-4">{user?.email} || {user?.role} || {user?.id}</p>
        </div>
    )
}

export default Dashboard