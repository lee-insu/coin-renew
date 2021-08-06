import React from 'react';

const SearchResult = ({search}) => {



    let resultArray;
    if(search) {
        const result = search.map(doc => 
                <li><a href={`/board/${doc.id}`}>
                    <h2>{doc.title}</h2>
                    <div>{doc.content}</div>
                    </a></li>
            )
            resultArray = result;
    }else {
        <li>no search</li>
    }


    return (
        <ul>
            {resultArray}
        </ul>
    )
}

export default SearchResult;