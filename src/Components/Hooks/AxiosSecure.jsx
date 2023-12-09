import {useContext, useEffect} from 'react';
import axios from "axios";
import {AuthContext} from "../AuthProvider/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})
const AxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked in the interceptor', error.res)
            if(error.response.status === 401 || error.response.status === 403){
                console.log('logout the user')
                logOut()
                    .then(() => {
                        toast.success("LogOut Successfull")
                        navigate('/login')
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        })
    })

    return axiosSecure;
};

export default AxiosSecure;