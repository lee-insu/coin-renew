import React, { useEffect, useState } from 'react';
import {firestore} from '../../service/firebase';

const Chatting = ({userInfo, board}) => {
   
    const [chat,setChat] = useState("");
    const [comment,getComment] = useState([]);

    
    const onChange = e => {
        const {target:{value}} =e;
        setChat(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            alert("comment suc!");
            await firestore.collection("chatting").doc(board).collection("messages").add({
                chat,
                name:userInfo.displayName,
                uid:userInfo.uid,
                time:new Date(),
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date: new Date().getDate()
            })
            setChat("");
            
            

        }catch(err) {
            console.log(err);
        }
        
    }


    const onDelete = async(cmtId,cmtUid) => {
        if(cmtUid === userInfo.uid){
        const del = window.confirm("are you sure you want comment?");
        if(del) {
            await firestore.collection("chatting").doc(board).collection("messages").doc(cmtId).delete();
        }
        }else {
            alert("your not writer!")
        }
    }


   
    useEffect(()=> {
        
        firestore.collection("chatting").doc(board).collection("messages").orderBy('time')
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            getComment(array);
        })
     
       
    },[])



    
   const comments = comment.map(cmt => 
   <li key={cmt.id}>{cmt.chat} writer:{cmt.name} <h3>{cmt.id}</h3> <button onClick={()=>onDelete(cmt.id,cmt.uid)}>del</button></li>
   )
   

    return (
        <>
         <ul>
            {comments}
        </ul> 
    
          <form onSubmit ={onSubmit}>
            <input 
            type="text"
            placeholder="write chat"
            value={chat}
            onChange={onChange}
            />
            <input type="submit"/>
          </form>
        </>
        
      
    )
}

export default Chatting;