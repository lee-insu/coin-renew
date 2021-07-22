import React, { useEffect, useState } from 'react';
import CoinPrice from '../coin_price/coin_price';
import SelectCoin from '../select_coin/select_coin';

const CoinInfo = () => {

    const [coins,getCoin] = useState(null);
    const [market,getMarket] = useState(null);

    useEffect(()=> {
        
        fetch('https://api.upbit.com/v1/market/all')
        .then(res => res.json())
        .then(async res => {
            const marketList = await res.map(coin => coin.market);
            const list = await res.map(coin => coin.korean_name);
            getMarket(marketList)
            getCoin(list);  
            
        })

    },[])

    

    return (
        <>
        <SelectCoin coins = {coins}/>
        <CoinPrice market = {market}/> 
        </>
    )
}
export default CoinInfo;