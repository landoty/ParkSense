import './App.css';
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home.js';
import Availability from './components/pages/availability/Availability.js';
import ParkingMap from './components/pages/parking-map/ParkingMap.js';
import NoPage from './components/pages/no-page/NoPage.js';
import MainNavBar from './components/general/MainNavBar.js';

function App() {
  return(
    <PrimeReactProvider>
      <Router>
        <MainNavBar></MainNavBar><br></br><br></br>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/availability" element={<Availability/>}/>
          <Route path="/parking-map" element={<ParkingMap/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </Router>
    </PrimeReactProvider>);
}

export default App;
