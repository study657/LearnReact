import React, {useState} from 'react';
import './App.css';
import HomePage from './Components/HomePage.js';
import AboutPage from './Components/AboutPage.js';
import CarsPage from './Components/CarsPage.js';
import DetailCar from './Components/DetailCar.js';
import {Route, NavLink, Redirect} from 'react-router-dom';

function App() {
  const [autorisation, setAutorisation] = useState(false);

  return (
    <div className="App">
        <nav>
            <NavLink exact to="/">HOME</NavLink>
            <NavLink exact to={{pathname: '/about', search: '?yfjr34556', hash: 'wtr'}} activeStyle={{color: 'blue', fontWeight: 'bold'}}>О НАС</NavLink>
            <NavLink exact to="/cars">МАШИНЫ</NavLink>
        </nav>
        <Route path='/' exact component={HomePage} />

        <hr />
        <button onClick={() => setAutorisation(!autorisation)}>Авторизация</button>

        <Route path='/about' exact component={AboutPage} />
        {autorisation ? <Route path='/cars' exact component={CarsPage} /> : null}
        <Route path='/cars/:name' component={DetailCar} />
        <Redirect to='/' />
    </div>
  );
}

export default App;
