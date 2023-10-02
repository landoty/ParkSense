import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Menu } from 'primereact/menu'

function App() {
  let pages = [
    {label : 'Home'},
    {label : 'Availability'},
    {label : 'Map'}
  ]
  return (
    <PrimeReactProvider>
      <Menu model={pages}/>
    </PrimeReactProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
