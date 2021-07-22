import './app.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import Auth from './components/auth_firebase/auth_firebase';


function App() {



  return (
    <div className="App">
      <Header/>
      <CoinInfo/>
      <Auth/>
    </div>
  );
}

export default App;
