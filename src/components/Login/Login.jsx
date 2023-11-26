import React, { useState } from 'react';
import '../../App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    console.log(auth);
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const handleGithubLogin = () =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggeduser = result.user;
            setUser(loggeduser)
            console.log(loggeduser);
        })
        .catch(error =>{
            console.log('error', error.message);
        })
    }
 
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null)
                console.log(result);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const LoggedUser = result.user;
                console.log(LoggedUser);
                setUser(LoggedUser)
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    return (
        <div>
            <h1>This is login</h1>

            {
            user ?
                 <button onClick={handleSignOut}>Sign Out</button>
                 :
                <>
                <button onClick={handleGoogleLogin}>Google Login</button>
                <button onClick={handleGithubLogin}>Github Signup</button>
                </>
        
            }




            {user && <div>
                <p>Name : {user?.displayName}</p>
                <p>Email : {user?.email}</p>
                <img src={user?.photoURL}></img>
            </div>}
        </div>
    );
};

export default Login;