import React, { useEffect, useState } from 'react';
import CoinPrice from '../coin_price/coin_price';
import SelectCoin from '../select_coin/select_coin';

const CoinInfo = () => {

    const [coins,getCoin] = useState(null);


    useEffect(()=> {
        
        fetch('https://api.upbit.com/v1/market/all')
        .then(res => res.json())
        .then(async res => {
            const list = await res.map(coin => coin);
            getCoin(list);  
        })
    },[])
  
    

    return (
        <>
        <SelectCoin coins = {coins}/>
        <CoinPrice/> 
        </>
    )
}
export default CoinInfo;