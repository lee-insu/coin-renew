import React, { useState } from 'react';
import firebase from 'firebase';
import {firebaseAuth} from '../../service/firebase';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
      
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [err,getErr] = useState("");
    const history = useHistory();
;

    const onChange = e => {
        const {target: {name,value}} = e;
        if (name === 'email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
        await firebaseAuth.signInWithEmailAndPassword(email,password)
        history.push('/');

        }
        catch(err){
            getErr("login err" + err)
        }
    }

    const googleLogin = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseAuth.signInWithPopup(provider)
        await history.push('/');
    }

    return (
      
        <>
        <form onSubmit={onSubmit}>
            <input 
            type="text"
            name="email"
            placeholder="please write your email"
            required
            value={email}
            onChange={onChange}
            />

            <input 
            type="password"
            name="password"
            placeholder="please write your password"
            required
            value={password || ""}
            onChange={onChange}

            />
            <input type="submit" value="sign in"/>
        </form>
        
        <div>
            <button onClick={googleLogin}>login with google</button>
        </div>
        <div><Link to ='signup'>are you want register?</Link></div>
        <div>{err}</div>
        </>

    )
}

export default Login;