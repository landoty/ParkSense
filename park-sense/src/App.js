import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import MainNavBar from './pages/components/MainNavBar.js'
import WhatIsParkSense from './pages/components/WhatIsParkSense';

function App() {
  return(
    <PrimeReactProvider>
      <MainNavBar></MainNavBar><br></br><br></br>
      <WhatIsParkSense></WhatIsParkSense>
    </PrimeReactProvider>);
}

export default App;
