import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../service/firebase';

const Header = () => {

    const auth = firebaseAuth;
    const [login,setLogin] = useState(false);
    const logout = () => {
        auth.signOut();
    }

    useEffect(()=> {
        auth.onAuthStateChanged(user => {
            if(user) {
                setLogin(true);
            }else{
                setLogin(false);
            }
        })
    },[])



    return (
        <div className="header">
        <div className="logo">코짖새</div>
        <nav>
            <ul>
                <li>투자지표</li>
                <li><Link to="/board">자유토론방</Link></li>
            </ul>
            
            <ul>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/signup">register</Link></li>
            </ul>
            {login ? 
                <div>
                    <div>안녕하세여</div>
                    <button onClick={logout}>logout</button> 
                </div> :
                <div></div>
            }
   


        </nav>
        </div>
        
    )

};

export default Header;