import React, { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
    roles: string[];
}

const PrivateRouter = ({ children, roles }: Props) => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const userRole = sessionStorage.getItem("role");

        if (!token || !userRole) {
            setRole(null);
        } else {
            setRole(userRole);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="w-100 d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
                <div className="spinner-grow" style={
                    {
                        width: "3rem",
                        height: "3rem"
                    }
                } role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (!role || !roles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRouter;