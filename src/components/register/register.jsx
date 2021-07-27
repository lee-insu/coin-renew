import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {firebaseAuth} from '../../service/firebase';

const Register = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [err,getErr] = useState();
    const history = useHistory();

    const onChange = e => {
        const {target:{name,value}} = e;
        if(name === 'email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }

    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email,password)
            history.push('/')
        } catch(err) {
            getErr("register err" + err)
        }
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
            <input type="submit" value="sign up"/>
        </form>
        
        <div>{err}</div>
        </>
    )
}

export default Register;