import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {firestore} from '../../service/firebase';


const Board = ({login}) => {

    const [board,getBoard] =useState([]);
    const history = useHistory();



    const userWrite = () => {
        if(login) {
            history.push('/write');
        }else {
            alert('please login');
            history.push('/login');
        }
    }


    useEffect(()=> {

        firestore.collection("board")
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getBoard(array);
        })
    

    },[])

    
    const boardArray = board.map(bb=><li key={bb.id}><Link to ={`/board/${bb.id}`}><h3>{bb.title}</h3></Link></li>)
    
    
    return(
        <>
        <ul>
            {boardArray}
        </ul>

        <button onClick={userWrite}>write</button>
        </>
        
    )
};


export default Board;