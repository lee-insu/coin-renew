import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette'

const Roulette = () => {

    const [one,getOne] = useState();
    const [two,getTwo] = useState();
    const [three,getThree] = useState();
    const [four,getFour] = useState();


    const data = [
        { option: one, style: { backgroundColor: 'green', textColor: 'black' } },
        { option: two, style: { backgroundColor: 'red' } },
        { option: three, style: { backgroundColor: 'blue' }  },
        { option: four, style: { backgroundColor: 'white' } },
      ]

      const [roulette,rouletteActive] = useState(false);
      const [mustSpin, setMustSpin] = useState(false);
      const [prizeNumber, setPrizeNumber] = useState(0);
    
      const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
      }

    const onChange = e => {
        const {target:{name,value}} = e;
        if(name ==='one') {
            getOne(value);
        }else if(name ==='two') {
            getTwo(value);
        }else if(name === 'three') {
            getThree(value);
        }else if(name === 'four') {
            getFour(value);
        }
    }



    return (
        <>
      
      {roulette ? 
      <div>
       <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}

        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      <button onClick={()=>rouletteActive(false)}>다시 쓰기</button>
     
      </div>
      : 
      <div>
           <input 
      type="text"
      name="one"
      value={one}
      onChange={onChange}
      />

      <input 
      type="text"
      name="two"
      value={two}
      onChange={onChange}
      />

      <input 
      type="text"
      name="three"
      value={three}
      onChange={onChange}
      />
      
      <input 
      type="text"
      name="four"
      value={four}
      onChange={onChange}
      />

      <button onClick={()=>rouletteActive(true)}>결정</button>
      </div> }
      
      </>
    );
};

export default Roulette;