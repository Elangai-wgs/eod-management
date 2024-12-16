import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Routers from './routes/index'
import { createContext, useEffect, useState } from "react";

export const PermissionContext = createContext();

function App() {
 
  const [permision,setPermission] = useState({})
  const location = useLocation();
  const url = location.pathname.split("/");
  const panel = url[1];
  useEffect(() => {
    panel === "sidebar" ? (document.title = "Super Admin") : "";
    panel === "trainersidebar" ? (document.title = "Trainer") : "";
    panel === "traineesidebar" ? (document.title = "Student") : "";
  }, []);
  return (
    <>
    <PermissionContext.Provider value={{permision,setPermission}}>
      <Provider store={store}>
        <Routers/>
      </Provider>
      </PermissionContext.Provider>
    </>
  );
}

export default App;
