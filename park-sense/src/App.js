/*
Name: App.js
Description:  Main javascript component to set up page structure and routing
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/05/23
*/
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home.js';
import Availability from './components/pages/availability/Availability.js';
import ParkingMap from './components/pages/parking-map/ParkingMap.js';
import NoPage from './components/pages/no-page/NoPage.js';
import MainNavBar from './components/general/MainNavBar.js';
import Footer from './components/general/Footer.js';

function App() {
  return(
        <Router>
          <MainNavBar></MainNavBar>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/availability" element={<Availability/>}/>
            <Route path="/parking-map" element={<ParkingMap/>}/>
            <Route path="*" element={<NoPage/>}/>
          </Routes>
          <Footer></Footer>
        </Router>
      );
}

export default App;
