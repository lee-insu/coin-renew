import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {firestore} from '../../service/firebase';

const BoardView = () => {


    const [title,getTitle] = useState("");
    const [content,getContent] = useState("");
    const [time,getTime] = useState({
        year:'',
        mon:'',
        date:''
    });


    const params = useParams();

    useEffect(()=> {
        firestore.collection("board").doc(`${params.id}`).get().then(result=> {
            const data = result.data();
            getTitle(data.title);
            getContent(data.content);
            getTime({
               year:data.year,
               mon:data.month,
               date:data.date,
            });
        })
    },[])



    return (
        <div>
            <h3>{title}</h3>
            <h3>{content}</h3>
            <h3>{time.year}년 {time.mon}월 {time.date}일 </h3>
         
        </div>
    )
}

export default BoardView;