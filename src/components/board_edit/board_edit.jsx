import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {firestore} from '../../service/firebase';

const BoardEdit = () => {
    
    
    const [title,getTitle] = useState();
    const [content,getContent] = useState();
    const params = useParams();
    const history = useHistory();

    const onSubmit = async(e) => {
        e.preventDefault();
        await firestore.collection("board").doc(`${params.id}`).update({
            title:title,
            content:content,
            newtime:new Date()
        })
        alert('edit suc!')
        history.push(`/board/${params.id}`)
    }

    const onChange = e => {
       const {target:{name,value}} = e;
       if (name === "title") {
           getTitle(value);
       }else if (name === "content") {
           getContent(value);
       }

    }

    useEffect(()=> {

        firestore.collection("board").doc(`${params.id}`).get().then(result => {
            const data = result.data();
            getTitle(data.title);
            getContent(data.content);
    
        })
    },[])


    return (
        <form onSubmit={onSubmit}>
             <input 
             type="text"
             name="title"
             value={title}
             onChange={onChange}
             />

            <input 
             type="text"
             name="content"
             value={content}
             onChange={onChange}
             />

            <input type="submit"/>
        </form>
       
    )
}

export default BoardEdit;