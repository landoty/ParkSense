import './App.css';
import { PrimeReactProvider } from 'primereact/api'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/pages/MainMenu';

function App() {
  return(
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu/>} />
          {/* Add More Pages Here: */}
          {/* <Route path="/availability" element={<Component_Name/>} /> */}
          {/* <Route path="/map" element={<Component_Name/>} /> */}
        </Routes>
      </Router>
    </PrimeReactProvider>);
}

export default App;
