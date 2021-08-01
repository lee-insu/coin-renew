import './app.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Board from './components/board/board';
import BoardWrite from './components/board_write/board_write';
import BoardView from './components/board_view/board_view';



function App() {



  return (
    <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path='/' component={CoinInfo} />
      <Route exact path ='/login' component={Login} />
      <Route exact path = '/signup' component={Register} />
      <Route exact path = '/board' component={Board} />
      <Route exact path = '/board/:id' component={BoardView} />
      <Route exact path = '/write' component={BoardWrite} />
    </Switch>
    </BrowserRouter>


  );
}

export default App;
