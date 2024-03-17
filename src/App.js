import logo from './logo.svg';
import React, { Component } from 'react';

import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movie from './Components/Movie';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/favourites' exact element={<Favourites />}  />

        <Route path='/movies' exact element={
            <>
              <Banner />
              <Movie />
            </>
          }/>
      </Routes>
    
    </Router>
  );
}

export default App;