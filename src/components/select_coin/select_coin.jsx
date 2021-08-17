import React, { useState } from 'react';

const SelectCoin = ({coins}) => {
    
    const [coin, coinSelect] = useState(null); 
    const [price, getPrice] = useState();
    const [changeRate, getChangeRate] = useState();
    const [ready,setReady] = useState(true);
    const [loading,setLoding] = useState(false);
    const [result,setResult] = useState(false);

    const coinSelected = () => {

        const setCoin = () => {
            setTimeout(()=> {
                setLoding(false);
                setResult(true);
                const selected = coins[Math.floor(Math.random() * coins.length)]
                coinSelect(selected.korean_name);   
                getMarket(selected.market);   
            },1000)
        }
        if(!coin) {
            setReady(false);
            setLoding(true);
            setCoin();
            
        }else {
            setResult(false);
            setLoding(true);
            setCoin();
        }
        
    }


    const getMarket = market => {
        fetch(`https://api.upbit.com/v1/ticker?markets=${market}`)
        .then(res => res.json())
        .then(async res => {
            await res.map(coin=> {
                getPrice(coin.trade_price);
                getChangeRate((coin.signed_change_rate*100).toFixed(2))
     
            });
            
        })
    }

    return(
        <>
        <h3>
        {ready ? <div>ready</div>:null}
        {loading ? <div>loading</div>:null}
        {result ? <div>result</div>:null}
        </h3>
        <button onClick={coinSelected} >{coin === null ? "코인랜덤뽑기":"다시뽑기"}</button>
        <div>
            <div>{coin}</div>
            {price % 1 === 0 && price > 0 ? <div>{price} 원</div>:<div>{price} BIT</div>}
            <div>{changeRate}%</div>
            </div>
        </>
    )


};

export default SelectCoin;