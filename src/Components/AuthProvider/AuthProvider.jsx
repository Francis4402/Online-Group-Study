import app from "../Firebase/firebase.config.js";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import {createContext, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import axios from "axios";

const auth = getAuth(app)

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (name, email, password, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: photoURL
                })
                    .then(() => {
                        return userCredential.user;
                    })
                    .catch(error => {
                        throw error;
                    })
            })
    }

    const signinwithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            setLoading(false);
            if(currentUser){
                axios.post('http://localhost:3000/jwt', loggedUser, {withCredentials: true})
                    .then(res => {
                        console.log('token response', res.data);
                    })
            } else {
                axios.post('http://localhost:3000/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                    })
            }
        })
        
        return () => {
            unSubscribe();
        }
    }, [user?.email])

    const authInfo = { user, setUser, createUser, signInUser, logOut, loading, signinwithGoogle }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}


export default AuthProvider;