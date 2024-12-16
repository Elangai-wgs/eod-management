import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import  Routers  from "./routes";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPermission } from "./Redux/PermissionRedux";

// export const PermissionContext = createContext();

function App() {
 
  // const [permision,setPermission] = useState({})
  const location = useLocation();
  const url = location.pathname.split("/");
  const panel = url[1];
  const dispatch = useDispatch();


  useEffect(() => {
    if (panel === "sidebar") {
      document.title = "Super Admin";
      dispatch(setPermission({ role: "Super Admin" }));
    } else if (panel === "trainersidebar") {
      document.title = "Trainer";
      dispatch(setPermission({ role: "Trainer" }));
    } else if (panel === "traineesidebar") {
      document.title = "Student";
      dispatch(setPermission({ role: "Student" }));
    }
  }, [panel, dispatch]);
  return (
    <>
      <Provider store={store}>
        <Routers />
      </Provider>
    </>
  );
}

export default App;
