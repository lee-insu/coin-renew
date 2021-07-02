import React, { useState } from 'react';

const SelectCoin = () => {
    
    const bird = [
        {
            key:1,
            img:"11"

        },
        {
            key:2,
            img:"22"
        },
        {
            key:3,
            img:"33"
        }
    ]



    const [coins,getCoin] = useState(null);
    

    const coinSelected = (e) => {
        e.preventDefault();
        setTimeout(()=> {
        fetch('https://api.upbit.com/v1/market/all')
             .then(res => res.json())
             .then(async res => {
             const coinList =await res.map(coin => coin.korean_name);
             const selected = coinList[Math.floor(Math.random() * coinList.length)]
             getCoin(selected);
             })
            },2000)
           };
    
  

    return(
        <>
        <img src="D" alt={coins ===null ? "dd" : "sd"}/>
        <button onClick={coinSelected}>{coins === null ? "코인랜덤뽑기":"다시뽑기"}</button>
        <div>{coins}</div>
        </>
    )


};

export default SelectCoin;