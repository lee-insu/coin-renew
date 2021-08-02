import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../service/firebase';


const Header = ({login,userInfo}) => {
    

    const logout = () => {
        firebaseAuth.signOut();
        window.location.replace("/")
    }


    return (
        <div className="header">
        <div className="logo">코짖새</div>
        <nav>
            <ul>
                <li>투자지표</li>
                <li><Link to="/board">자유토론방</Link></li>
            </ul>
            
            {login ? 
                <div>
                    <div>{userInfo.displayName}님 하이루~</div>
                    <button onClick={logout}>logout</button> 
                </div> :
                <ul>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/signup">register</Link></li>
                </ul>
            }
   


        </nav>
        </div>
        
    )

};

export default Header;