import {motion} from "framer-motion";
import { useContext } from "react";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
const Navbar = () => {

    const {user, logOut} = useContext(AuthContext)

    const handleLogout = () => {
        logOut()
        .then(() => {
            toast.success("logOut Successfully")
        })
        .catch(error => console.error(error))
    }

    const navItems = <>
        <Link to="/"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>Home</motion.div></Link>
        <Link to="/howitworks"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>How it works</motion.div></Link>
        <Link to="/about"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>About</motion.div></Link>
        { user &&
            <Link to="/addassignment"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>Add-Assignment</motion.div></Link>
        }

    </>

    const logins = <>
        {
            !user && <>
                <Link to="/login"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>Login</motion.div></Link>
                <Link to="/register"><motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}}>Register</motion.div></Link>
            </> 
        }
    </>

    return (
        <div className="justify-center flex bg-[#4F4A45]">
            <Toaster position="top-center"/>
            <motion.div initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} transition={{type: "spring", stiffness: 200, damping: 10, duration: 1}} className="container py-5 md:px-0 px-3">
                <div className="navbar justify-between">
                    <div>
                        <Link to="/"><img className="md:w-[100px] w-20" src="/mylogo.png" alt="i"/></Link>
                    </div>

                    <div>
                        <div >
                            <ul className="menu px-1">
                                <div className="flex items-center gap-5 text-[#F6F1EE]">
                                    <li className="menu-horizontal font-semibold text-lg gap-4 hidden md:flex">{navItems}</li>
                                    <li className="menu-horizontal justify-center font-semibold text-lg md:gap-4 gap-2">{logins}</li>
                                </div>                                                   
                            </ul>
                        </div>
                        

                        {
                            user && <>
                                <div className="flex-none">
                        
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={user?.photoURL} alt="i" />
                                            </div>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <a>
                                                    {user?.displayName}
                                                </a>
                                            </li>
                                            
                                            <Link to="/myassignments">
                                                <li>
                                                    <button>
                                                        UserAssignment
                                                    </button>
                                                </li>
                                            </Link>

                                            
                                            <li className="md:hidden grid">{navItems}</li>
                                            <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 500, damping: 10, duration: 1}} onClick={handleLogout}><a>Logout</a></motion.li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        }
                        
                    </div>

                                       
                    
                </div>
            </motion.div>
        </div>
    );
};

export default Navbar;