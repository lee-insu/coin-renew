import React, { useEffect, useState } from 'react';
import {firestore} from '../../service/firebase';

const Chatting = ({userInfo, board}) => {
   
    const [chat,setChat] = useState("");
    const [comment,getComment] = useState([
        

    ]);
    
    
    const onChange = e => {
        const {target:{value}} =e;
        setChat(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await firestore.collection("chatting").doc(board).collection("messages").add({
                chat,
                name:userInfo.displayName,
                uid:userInfo.uid,
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date: new Date().getDate()
            })
        }catch(err) {
            console.log(err);
        }
        
    }


   
    useEffect(()=> {
        
        firestore.collection("chatting").doc(board).collection("messages")
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            getComment(array);
        })
    
        // firestore.collection("chatting").doc(board).collection("messages").get().then(result=>{
        //    result.forEach(e => {
        //         let arr=[];
        //         arr.push(e.data())
        //         getComment(arr);

        //    })
        //     })
    },[])

   const comments = comment.map(cmt => <li key={cmt.id}>{cmt.chat}</li>)


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