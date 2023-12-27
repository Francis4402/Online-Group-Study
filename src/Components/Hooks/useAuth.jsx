import {useContext} from 'react';
import {AuthContext} from "../AuthProvider/AuthProvider.jsx";

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;