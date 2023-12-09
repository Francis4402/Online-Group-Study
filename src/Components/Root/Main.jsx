import {Outlet} from "react-router-dom";
import Navbar from "../AllRoutes/Navbar.jsx";

const Main = () => {
    return (
        <div className={"font-signature"}>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;