import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {firestore} from '../../service/firebase';


const Board = () => {

    const [board,getBoard] =useState([]);


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

        <div><Link to="/write">write</Link></div>
        </>
        
    )
};


export default Board;