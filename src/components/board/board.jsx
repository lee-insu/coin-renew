import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {firestore} from '../../service/firebase';
import Search from '../search/search';
import {useInView} from 'react-intersection-observer';


const Board = ({login}) => {

    const [board,getBoard] =useState([]);
    const [lastDoc,setLastDoc] = useState();
    const [loading,setLoading] = useState(false);
    const [isEmpty,setIsEmpty] = useState(false);
    const history = useHistory();
  



    const userWrite = () => {
        if(login) {
            history.push('/write');
        }else {
            alert('please login');
            history.push('/login');
        }
    }


    const fetchMore = () => {
        
        setLoading(true);
        firestore.collection("board").orderBy('time','desc')
        .startAfter(lastDoc).limit(3)
        .onSnapshot(snapshot => {

            const isCollectionEmpty = snapshot.size === 0;

            if(!isCollectionEmpty) {
                 const array = snapshot.docs.map(doc => ({
                     id:doc.id,
                     time:new Date(),
                     ...doc.data()
                 }))
                 const lastDoc = snapshot.docs[snapshot.docs.length -1];
                 setLastDoc(lastDoc);
                 getBoard((board) => [...board,...array]);
                 setLoading(false);
               }else {
                setLoading(false);
                 setIsEmpty(true)
               }
            })
         
        
    }




    useEffect(()=> {

        firestore.collection("board").orderBy('time','desc').limit(3)
        .onSnapshot(snapshot => {
            const isCollectionEmpty = snapshot.size === 0;

            if(!isCollectionEmpty) {
                 const array = snapshot.docs.map(doc => ({
                     id:doc.id,
                     time:new Date(),
                     ...doc.data()
                 }))
                 const lastDoc = snapshot.docs[snapshot.docs.length -1];
                 setLastDoc(lastDoc);
                 getBoard((board) => [...board,...array]);
                 setLoading(false);
               }else {
                setLoading(false);
                 setIsEmpty(true)
               }
            
        })
        

    },[])


    
    const boardArray = board.map(bb=><li key={bb.id}><Link to ={`/board/${bb.id}`}><h3>{bb.title}</h3></Link><h4>{bb.content}</h4></li>)
    
    
    return(
        <>
        <ul>
            {boardArray}
        </ul>
        {loading ? <h3>loading..</h3> : null}
        {isEmpty ? <h3>no more aritcle</h3>: <button onClick={fetchMore}>more</button>}
        <button onClick={userWrite}>write</button>
        
        <Search />
        </>
        
    )
};


export default Board;