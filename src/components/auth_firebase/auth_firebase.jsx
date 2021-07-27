import React, { useState } from 'react';
import firebase from 'firebase';
import {firebaseAuth} from '../../service/firebase';

const Auth = () => {
    
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [newAccount, setNewAccount] =useState(false); 

 
    const onChange = e => {
       const{target:{name,value}} = e;
       if (name === "email") {
           setEmail(value);
       }else if (name ==="password") {
           setPassword(value)
       }
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        let account;
        try{
        if (newAccount) {
            account = await firebaseAuth.createUserWithEmailAndPassword(email,password)
            setNewAccount(account)
        }else {
            account = await firebaseAuth.signInWithEmailAndPassword(email,password)
            setNewAccount(account)
        }
        }catch(err) {
            console.log(err)
        }
    }

    const googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseAuth.signInWithPopup(provider)
      
    };

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
            <input type="submit" value={newAccount ? "create Account":"login"}/>
        </form>
        
        <div>
            <button onClick={googleLogin}>login with google</button>
        </div>
        </>
    )
}
 
export default Auth;