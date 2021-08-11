import React, { useEffect, useState } from 'react';
import {firestore} from '../../service/firebase';

const Chatting = ({userInfo, board}) => {
   
    const [chat,setChat] = useState("");
    // const [reChat,setReChat] = useState("")
    const [comment,getComment] = useState([]);
    const [chatId,getchatId]=useState();
    // const [active,setActive] =useState(false);


    
    const onChange = e => {
        const {target:{name,value}} =e;
        if(name === "chat"){
        setChat(value);
        }
        // else if(name === "rechat") {
        //     setReChat(value);
        // }
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
            // setActive(false);
        }catch(err) {
            console.log(err);
        }

        //   try{
        //     alert("recomment suc!");
        //     await firestore.collection("chatting").doc(board).collection("messages").doc(chatId).collection("rechatting").add({
        //         reChat,
        //         chatUid:chatId,
        //         name:userInfo.displayName,
        //         uid:userInfo.uid,
        //         time:new Date(),
        //         year:new Date().getFullYear(),
        //         month:new Date().getMonth()+1,
        //         date: new Date().getDate()
        //     })
        //     setReChat("");
        //     setActive(false);
        //     console.log(chatId);
        //   }catch(err){
        //       console.log(err)
        //   }  
 
        
    }

    // const onActive = cmtId => {
    //     setActive(true);
    //     getchatId(cmtId);
    // }


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

    
   // 여기서 active 설정에 대한 문제 해답을 해야할듯
   //정보 생성시 해당 uid를 정보에 넣고 update를 통해서 (where)을 사용해 해당 uid값이 있는 값을 출력
    useEffect(()=> {
   
        firestore.collection("chatting").doc(board).collection("messages").orderBy('time')
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            getComment(array);
        })
        // firestore.collection("chatting").doc(board).collection("messages").doc(chatId).collection("rechatting").orderBy('time')
        //     .onSnapshot(snapshot => {
        //     const array = snapshot.docs.map(doc => ({
        //         id:doc.id,
        //         ...doc.data(),
        //     }));
        //     getReComment(array);
        // })

    },[])


//    const reComments = reComment.map(recmt => 
//    <li key={recmt.id}>
//        <div>rechat</div>
//        {recmt.reChat} writer:{recmt.name}
//        <h3>{recmt.id}</h3>
//    </li>) 

   
    
   const comments = comment.map(cmt => 
   <li key ={cmt.id}>
       {cmt.chat} writer:{cmt.name}
        <h3>{cmt.id}</h3> 
        <button onClick={()=>onDelete(cmt.id,cmt.uid)}>del</button>
        {/* <button onClick={()=>onActive(cmt.id)}>rechat</button> */}
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
            name = "chat"
            placeholder="please chat"
            value={chat}
            // name ={!active ? "chat" : "rechat"}
            // placeholder={!active ? "please chat" : "please rechat" }
            // value={!active ? chat : reChat}
            onChange={onChange}
            />
            <input type="submit"/>
          </form>
        </>
        
      
    )
}

export default Chatting;