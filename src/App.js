import './app.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Board from './components/board/board';
import BoardWrite from './components/board_write/board_write';
import BoardView from './components/board_view/board_view';
import { firebaseAuth } from '../src/service/firebase';
import { useEffect, useState } from 'react';
import BoardEdit from './components/board_edit/board_edit';


function App() {

  const [userInfo,getUser] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(()=> {
    firebaseAuth.onAuthStateChanged(user => {
      if(user) {
        getUser(user);
        setLogin(true);
      }else {
        setLogin(false);
      }
    })
  },[])

  

  return (
    <BrowserRouter>
    <Header login = {login} userInfo={userInfo}/>
    <Switch>
      <Route exact path='/' component={CoinInfo} />
      <Route exact path ='/login' component={Login} />
      <Route exact path = '/signup' component={Register} />
      <Route exact path = '/board' render={()=><Board login={login}/>} />
      <Route exact path = '/board/:id' render={()=> <BoardView login={login} userInfo={userInfo} />} />
      <Route exact path = '/board/:id/edit' component={BoardEdit} />
      <Route exact path = '/write' render={()=> <BoardWrite userInfo={userInfo}/>} />
    </Switch>
    </BrowserRouter>


  );
}

export default App;
