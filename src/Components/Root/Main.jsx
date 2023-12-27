import {Outlet} from "react-router-dom";
import Navbar from "../AllRoutes/Navbar.jsx";
import {Helmet} from "react-helmet";

const Main = () => {
    return (
        <div className={"font-signature"}>
            <Helmet>
                <title>OGS | Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;