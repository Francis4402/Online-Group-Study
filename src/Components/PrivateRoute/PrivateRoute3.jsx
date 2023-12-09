import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'

const PrivateRoute3 = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="flex justify-center items-center min-h-screen">
            <progress className="progress w-56"></progress>
        </div>
    }

    if(user?.email){
        return children
    }

  return (
    <Navigate state = {location.pathname} to="/login" replace/>
  )
}

PrivateRoute3.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute3