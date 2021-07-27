import './app.css';
import CoinInfo from './components/coin_info/coin_info';
import Header from './components/header/header';
import Auth from './components/auth_firebase/auth_firebase';
import {firebaseAuth} from './service/firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CoinPrice from './components/coin_price/coin_price';
import Login from './components/login/login';
import Register from './components/register/register';


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
    </Switch>
    </BrowserRouter>


  );
}

export default App;
