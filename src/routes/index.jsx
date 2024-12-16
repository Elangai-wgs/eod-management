import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import routePages from "./routes";
import PageNotFound from "../components/PageNotFound";

const isAllowed = (access = []) => {
    const role = localStorage.getItem("role") || "superAdmin";
    return access.includes(role) || access.includes("open");
};

const createRoute = (key, path, element, nestedRouteElements) => (
    <Route key={key} path={path} element={element}>
        {nestedRouteElements}
    </Route>
);

const renderNestedRoutes = (nestedRoutesArray = []) => {
    return nestedRoutesArray.map((route, index) => {
        const { access, element, path, title, nestedRoutes } = route;
        if (!isAllowed(access)) {
            return null;
        }
        const nestedRouteElements = nestedRoutes ? renderNestedRoutes(nestedRoutes) : null;
        const key = title;

        return createRoute(key, path, element, nestedRouteElements);
    });
};

const renderRoutes = (routesArray = []) => {
    return routesArray.map((route, index) => {
        const { access, element, path, title, nestedRoutes } = route;
        if (!isAllowed(access)) {
            return null;
        }
        const nestedRouteElements = nestedRoutes ? renderNestedRoutes(nestedRoutes) : null;
        const key = title;

        return createRoute(key, path, element, nestedRouteElements);
    });
};

const Routers = () => {
  
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('adminToken')&&location.pathname === "/") {
            navigate("/dashboard");
        }
        if(!localStorage.getItem('adminToken')&&location.pathname === "/"){
            navigate("/login"); 
        }
    }, [location, navigate]);

    return (
        <Routes>
            {renderRoutes(routePages)}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;
