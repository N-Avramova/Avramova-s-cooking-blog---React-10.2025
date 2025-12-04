import { Navigate, Outlet } from "react-router";

export default function AuthGuard({
    user,
}) {
    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}