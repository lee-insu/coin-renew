import './app.css';
import CoinPrice from './components/coin_price/coin_price';
import Header from './components/header/header';
import SelectCoin from './components/select_coin/select_coin';

function App() {
  return (
    <div className="App">
      <Header />
      <SelectCoin />
      <CoinPrice/>
    </div>
  );
}

export default App;
