import React, { useEffect, useState } from 'react';
import {useHistory, useParams } from 'react-router-dom';
import {firestore} from '../../service/firebase';


const BoardView = ({login,userInfo}) => {


    const [title,getTitle] = useState("");
    const [content,getContent] = useState("");
    const [user,getUser] =useState({
        name:'',
        uid:''
    });
    const [time,getTime] = useState({
        year:'',
        mon:'',
        date:''
    });

    const params = useParams();
    const history = useHistory();


    const onEdit = () => {
        if (login && userInfo.uid === user.uid) {
            try {
            history.push(`/board/${params.id}/edit`);
            } catch(err) {
                console.log(err);
            }
        }else if (login && userInfo.uid !== user.uid) {
            alert('you are not writer!');
        }
        else {
            alert("did you writer?");
            history.push('/login');
        }
    }


    const onDelete = async() => {
        const del = window.confirm("are you sure you want to delete article?");
        if(del) {
            await firestore.collection("board").doc(`${params.id}`).delete(); 
           alert('delete!');
            history.push('/board');
        }
    }


    useEffect(()=> {
        firestore.collection("board").doc(`${params.id}`).get().then(result=> {
            const data = result.data();
            getTitle(data.title);
            getContent(data.content);
            getUser({
                name:data.name,
                uid:data.uid
            })
            getTime({
               year:data.year,
               mon:data.month,
               date:data.date,
            });
        })
    },[])



    return (
        <div>
            <div>
            <h3>{title}</h3>
            <h3>{content}</h3>
            <h3>{time.year}년 {time.mon}월 {time.date}일 </h3>
            <h4>{user.name}작성 {user.uid}코드</h4>
            </div>
            <button onClick={onEdit}>edit</button>
            {login && userInfo.uid === user.uid ? 
            <button onClick={onDelete}>delete</button> : null }
        </div>
    )
}

export default BoardView;