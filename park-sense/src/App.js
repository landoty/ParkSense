import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Availability from './components/pages/Availability';
import ParkingMap from './pages/ParkingMap';
import NoPage from './pages/NoPage';
import MainNavBar from './components/MainNavBar.js'
import WhatIsParkSense from './components/WhatIsParkSense';
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/pages/MainMenu';

function App() {
  return(
    <PrimeReactProvider>
      <MainNavBar></MainNavBar><br></br><br></br>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/availability" element={<Availability/>}/>
          <Route path="/parking-map" element={<ParkingMap/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>);
}

export default App;
