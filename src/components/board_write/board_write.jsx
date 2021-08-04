import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import {firestore} from '../../service/firebase';

const BoardWrite = ({userInfo}) => {

    const [title,getTitle] = useState("");
    const [content,getContent] = useState("");

    const history = useHistory();
  

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        await firestore.collection("board").add({
            title,
            content,
            uid:userInfo.uid,
            name:userInfo.displayName,
            time:new Date(),
            year:new Date().getFullYear(),
            month:new Date().getMonth()+1,
            date: new Date().getDate()
        })

        getTitle("");
        getContent("");
        alert("success!")
        history.push('/board');
    }catch(err) {
        alert(`board err ${err}`)  
    }
    }


    const onChange = e => { 
        const {target:{name,value}} = e;

        if (name === "title") {
            getTitle(value);
        }else if (name === "content") {
            getContent(value);
        }
    }

    return(
        <form onSubmit={onSubmit}>

            <input 
            type="text"
            name="title"
            value={title}
            placeholder="please write title"
            onChange={onChange}
            required
            />

            <input 
            type="text" 
            name="content"
            value={content}
            placeholder="please write content"
            onChange={onChange}
            required
            />

        <input type="submit" />

        </form>
    )
}

export default BoardWrite;