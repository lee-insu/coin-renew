import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {firestore} from '../../service/firebase';
import SearchResult from '../search_result/search_result';


const Search = () => {


    const [search,setSearch] = useState("");
    const [result,getResult] = useState();




    const onSubmit = async(e) => {
        e.preventDefault();
        await firestore.collection("board").where("title",">=",search).where("title","<=",search + "\uf8ff")
        .onSnapshot(snapshot => {
            const array = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }))
            getResult(array)
        })

    }
        

    const onChange = e => {
        const {target:{value}} = e;
        setSearch(value);
    } 
  



    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
            type="text" 
            value={search}
            onChange={onChange}
            placeholder="please search"
            required
            />
            <input type="submit"/>
        </form>
        <SearchResult search ={result}/>

        </>
    )
}

export default Search;