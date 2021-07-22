import React, { useState } from 'react';

const SelectCoin = ({coins}) => {
    
    const [coin, coinSelect] = useState(null); 

    const coinSelected = (e) => {
        e.preventDefault();
        setTimeout(()=> {
            const selected = coins[Math.floor(Math.random() * coins.length)]
            coinSelect(selected);
        },1000)
    }



    return(
        <>
        <button onClick={coinSelected} >{coin === null ? "코인랜덤뽑기":"다시뽑기"}</button>
        <div>{coin}</div>
        </>
    )


};

export default SelectCoin;