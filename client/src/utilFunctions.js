import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
export function useIsAuthenticated() {
    return useSelector((state) => state?.auth?.isAuthenticated);
}


export function useRoleCheck() {
    return useSelector((state) => state.auth?.user?.role);
}

export function useNavigateToPath() {
    const navigate = useNavigate();

    const navigateToPath = (path) => {
        navigate(path);
    };

    return navigateToPath;
}

