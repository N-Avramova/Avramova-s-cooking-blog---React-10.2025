import { Navigate, Outlet } from "react-router";

export default function AuthGuard({
    userId,
}) {
    if (!userId) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}