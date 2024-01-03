import React, { } from "react";
import './App.css';

import Home from './components/Home';
import CarHome from './components/Car/CarHome';
import CarView from './components/Car/CarView';
import CarEdit from './components/Car/CarEdit';
import BrandHome from './components/Brand/BrandHome';
import BrandView from './components/Brand/BrandView';
import BrandEdit from './components/Brand/BrandEdit';
import ModelHome from './components/Model/ModelHome';
import ModelView from './components/Model/ModelView';
import ModelEdit from './components/Model/ModelEdit';
import ColorHome from './components/Color/ColorHome';
import ColorView from './components/Color/ColorView';
import ColorEdit from './components/Color/ColorEdit';
import SimulationHome from './components/Simulation/SimulationHome';
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

          <Route exact path="/modelos" element={<ModelHome/>} />
          <Route exact path="/modelos/view/:id" element={<ModelView/>} />
          <Route exact path="/modelos/edit/:id" element={<ModelEdit/>} />

          <Route exact path="/cores" element={<ColorHome/>} />
          <Route exact path="/cores/view/:id" element={<ColorView/>} />
          <Route exact path="/cores/edit/:id" element={<ColorEdit/>} />
          
          <Route exact path="/simulacao" element={<SimulationHome/>} />

          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
