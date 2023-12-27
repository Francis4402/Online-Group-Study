import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {AiFillGoogleCircle} from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottieanim from '../AnimationSVG/Lottieanim2'
import axios from "axios";
import useAuth from "../Hooks/useAuth.jsx";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";

const Register = () => {

    const {createUser, signinwithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;

        console.log(name, email, password)

        createUser(name, email, password, photoURL)
            .then(() => {
                const user = {name, email};
                axiosPublic.post('/jwt', user)
                    .then(res => {
                        if(res.data.success){
                            navigate(location?.state ? location?.state : '/')
                        }
                    })
                toast.success('User Registration successful')
            })
            .catch(error => {
                console.error(error)
                toast.error('Email Already registered')
            })

      }
    const handlegooglesignin = () => {
        signinwithGoogle()
            .then(() => {
                toast.success('Your Logged In')
            })
            .catch(() => {
                toast.error('Email or password is incorrect')
            })
    }


  return (
    <div className={"justify-center flex"}>
            <Toaster position="top-center"/>
            <div className={"container"}>
                <div className={"sm:flex grid justify-center items-center lg:gap-32 gap-8 w-full min-h-screen"}>
                    <div className={"md:p-0 p-5"}>
                        <Lottieanim/>
                    </div>
                    <div className="hero md:w-[600px] h-full">
                        <motion.div initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 100, damping: 10, duration: 0.5}} className="hero-content flex-col w-full">
                            <div className="text-center lg:text-left">
                                <h1 className="text-5xl font-bold">Register</h1>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <form onSubmit={handleRegister} className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="Your name"
                                               className="input input-bordered"
                                               required/>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>
                                        <input type="url" name="photoURL" placeholder="Photo Url"
                                               className="input input-bordered"
                                               required/>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name="email" placeholder="Your email"
                                               className="input input-bordered"
                                               required/>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" name="password" placeholder="password"
                                               className="input input-bordered"
                                               required/>
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6 space-y-4 text-base-content">
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                        <p className={"capitalize font-semibold text-center"}>or sign up with</p>
                                        <div className={"flex justify-center gap-2"}>
                                            <button onClick={handlegooglesignin}>
                                                <AiFillGoogleCircle size={40}/>
                                            </button>
                                        </div>
                                        <div className={"flex justify-between items-center"}>
                                            <p>Already have an account?</p>
                                            <Link to={"/login"}><p className={"btn btn-link capitalize"}>SignIn</p>
                                            </Link>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Register