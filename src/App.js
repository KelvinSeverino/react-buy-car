import React, { } from "react";
import './App.css';

import Home from './components/Home';
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
