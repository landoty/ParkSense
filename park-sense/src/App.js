import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.js';
import Availability from './components/pages/Availability';
import ParkingMap from './components/pages/ParkingMap';
import NoPage from './components/pages/NoPage';
import MainNavBar from './components/page-structure/MainNavBar.js'

function App() {
  return(
    <PrimeReactProvider>
      <MainNavBar></MainNavBar><br></br><br></br>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/availability" element={<Availability/>}/>
          <Route path="/parking-map" element={<ParkingMap/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>);
}

export default App;
