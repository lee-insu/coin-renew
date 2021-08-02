import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {firebaseAuth} from '../../service/firebase';

const Register = () => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [nickname,setNickname] = useState();
    const [err,getErr] = useState("");
    const history = useHistory();


    const onChange = e => {
        const {target:{name,value}} = e;
        if(name === 'email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }else if (name === 'nickname') {
            setNickname(value);
        }

    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email,password).then(result=> {
                result.user.updateProfile({displayName:nickname})
            })
            history.push('/')
        } catch(err) {
            getErr("register err" + err)
        }
    }



    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
            type="email"
            name="email"
            placeholder="please write your email"
            required
            value={email}
            onChange={onChange}
            required
            />

            <input 
            type="password"
            name="password"
            placeholder="please write your password"
            required
            value={password || ""}
            onChange={onChange}
            required
            />

            <input 
            type="text"
            name="nickname"
            placeholder="please write your nickname"
            required
            value={nickname}
            onChange={onChange}
            required

            />
            <input type="submit" value="sign up"/>
        </form>
        
        <div>{err}</div>
        </>
    )
}

export default Register;