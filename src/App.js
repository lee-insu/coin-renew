import './app.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Board from './components/board/board';
import BoardWrite from './components/board_write/board_write';


function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path='/'>
        <CoinInfo/>
      </Route>
      <Route exact path ='/login'>
        <Login />
      </Route>
      <Route exact path = '/signup'>
        <Register/>
      </Route>
      <Route exact path = '/board'>
        <Board />
      </Route>
      <Route exact path = '/write'>
        <BoardWrite/>
      </Route>
    </Switch>
    </BrowserRouter>


  );
}

export default App;
