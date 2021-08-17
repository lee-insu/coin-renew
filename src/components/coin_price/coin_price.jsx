import React, { useEffect, useState } from 'react'; 

const CoinPrice = () => {

   
    const [coinInfo,getCoinInfo] = useState(false);
    const coinList = 'krw-btc,krw-eth,krw-ada,krw-xrp,krw-doge,krw-dot,btc-luna'
    const [btc,getBtc] = useState();
    const [eth,getEth] = useState();
    const [ada,getAda] = useState();
    const [xrp,getXrp] = useState();
    const [doge,getDoge] = useState();
    const [dot,getDot] = useState();
    const [luna,getLuna] = useState();

   useEffect(()=> {
    // setInterval(()=>{
        fetch(`https://api.upbit.com/v1/ticker?markets=${coinList}`)
        .then(res => res.json())
        .then(async res => {
            const coinPrice = await res.map(coin => coin);
            const coinArray = Object.assign(coinPrice);
            getBtc(coinArray[0]);
            getEth(coinArray[1]);
            getAda(coinArray[2]);
            getXrp(coinArray[3]);
            getDoge(coinArray[4]);
            getDot(coinArray[5]);
            getLuna(coinArray[6]);
            getCoinInfo(true);
        })
        
        
    // },4000);
   },[])
  
//    for(let i = 0; i < coinPrice.length; i++) {
//     getPrice(coinPrice[i].trade_price);
//     getSignChange((coinPrice[i].signed_change_rate*100).toFixed(2));
   
//  }


    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>코인</th>
                    <th>가격(upbit)</th>
                    <th>변동률</th>
                </tr>
            </thead>
            <tbody>
                {coinInfo ? 
                <>
                <tr>
                    <th>비트코인</th>
                    <th>{btc.trade_price}</th>
                    <th>{(btc.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                 <tr>
                    <th>이더리움</th>
                    <th>{eth.trade_price}</th>
                    <th>{(eth.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>에이다</th>
                    <th>{ada.trade_price}</th>
                    <th>{(ada.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>리플</th>
                    <th>{xrp.trade_price}</th>
                    <th>{(xrp.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>도지코인</th>
                    <th>{doge.trade_price}</th>
                    <th>{(doge.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>폴카닷</th>
                    <th>{dot.trade_price}</th>
                    <th>{(dot.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                <tr>
                    <th>루나</th>
                    <th>{luna.trade_price}</th>
                    <th>{(luna.signed_change_rate*100).toFixed(2)}</th>
                </tr>
                </>
                :null}
               
               
            </tbody>
        </table>
        </>
    )

}

export default CoinPrice;