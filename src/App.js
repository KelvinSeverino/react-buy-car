import React, { } from "react";
import './App.css';

import Home from './components/Home';
import CarHome from './components/Car/CarHome';
import CarView from './components/Car/CarView';
import CarEdit from './components/Car/CarEdit';
import BrandHome from './components/Brand/BrandHome';
import BrandView from './components/Brand/BrandView';
import BrandEdit from './components/Brand/BrandEdit';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/veiculos" element={<CarHome/>} />
          <Route exact path="/veiculos/view/:id" element={<CarView/>} />
          <Route exact path="/veiculos/edit/:id" element={<CarEdit/>} />
          <Route exact path="/marcas" element={<BrandHome/>} />
          <Route exact path="/marcas/view/:id" element={<BrandView/>} />
          <Route exact path="/marcas/edit/:id" element={<BrandEdit/>} />

          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
