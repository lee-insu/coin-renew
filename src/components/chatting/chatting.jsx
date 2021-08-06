import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {firestore} from '../../service/firebase';

const Chatting = ({userInfo, board}) => {
   
    const [chat,setChat] = useState("");
    const [reChat,setReChat] = useState("")
    const [comment,getComment] = useState([]);
    const [reComment,getReComment] = useState([]);
    const [active,setActive] =useState(false);


    
    const onChange = e => {
        const {target:{name,value}} =e;
        if(name === "chat"){
        setChat(value);
        }else if(name === "rechat") {
            setReChat(value);
        }
    }


    const onSubmit = async (e) => {
        console.log(e.target.name);
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

    const onActive = e => {
        e.preventDefault();
        setActive(true);
    }

    console.log(active);

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
   <li key={cmt.id}>
       {cmt.chat} writer:{cmt.name}
        <h3>{cmt.id}</h3> 
        <button onClick={()=>onDelete(cmt.id,cmt.uid)}>del</button>
        <button onClick={onActive}>rechat</button>
        </li>
   )
   

    return (
        <>
         <ul>
            {comments}
        </ul> 
          <form onSubmit ={onSubmit}>
            <input 
            type="text"
            name ={!active ? "chat" : "rechat"}
            placeholder={!active ? "please chat" : "please rechat" }
            value={!active ? chat : reChat}
            onChange={onChange}
            />
            <input type="submit"/>
          </form>
        </>
        
      
    )
}

export default Chatting;