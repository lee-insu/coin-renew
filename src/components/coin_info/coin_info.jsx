import React, { useEffect, useState } from 'react';
import CoinPrice from '../coin_price/coin_price';
import Roulette from '../roulette/roulette';
import SelectCoin from '../select_coin/select_coin';

const CoinInfo = () => {

    const [coins,getCoin] = useState(null);


    useEffect(()=> {
        
        fetch('https://api.upbit.com/v1/market/all')
        .then(res => res.json())
        .then(async res => {
            const list = await res.map(coin => coin);
            const btcExpect = list.filter(e => {return e.market.indexOf('BTC-')});
            const usdtExpect = btcExpect.filter(e => {return e.market.indexOf('USDT-')})

            getCoin(usdtExpect);
        })
    },[])
  
    

    return (
        <>
        <SelectCoin coins = {coins}/>
        <CoinPrice/> 
        <Roulette />
        </>
    )
}
export default CoinInfo;