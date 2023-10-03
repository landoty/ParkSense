import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import TabSidebar from './components/TabSidebar.js'
import BlueLogo from './components/BlueLogo.js'

function App() {
  return(
    <PrimeReactProvider>
      <TabSidebar></TabSidebar><br></br><br></br>
      <center><BlueLogo></BlueLogo></center>
    </PrimeReactProvider>);
}

export default App;
