import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import routePages from "./routes";
import PageNotFound from "../components/PageNotFound";
import { useSelector } from "react-redux";
import { isAllowedTo } from "../utils/utils";

// Utility function for checking access permissions
const isAllowed = (access = [], key = "", permissionKeys = []) => {
  return access.includes("open") || isAllowedTo(permissionKeys, [key]);
};

// Recursive function to create routes
const renderRoutes = (routesArray = [], permissionKeys = []) => {
  return routesArray.map((route) => {
    const { access, element, path, title, nestedRoutes, key: permissionKey } = route;

    // Check permissions before rendering the route
    if (!isAllowed(access, permissionKey, permissionKeys)) return null;

    // Recursively render nested routes if available
    const nestedRouteElements = nestedRoutes
      ? renderRoutes(nestedRoutes, permissionKeys)
      : null;

    return (
      <Route key={title} path={path} element={element}>
        {nestedRouteElements}
      </Route>
    );
  });
};

const Routers = () => {
  const permission = useSelector((state) => state.Permissions);
  console.log(permission,"permissions")
  const permissionKeys = Object.keys(permission??{});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token && location.pathname === "/") {
      navigate("/dashboard");
    } else if (!token && location.pathname === "/") {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <Routes>
      {/* Render all routes */}
      {renderRoutes(routePages, permissionKeys)}

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
