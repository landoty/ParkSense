import MenuBar from "../page-structure/MenuBar";
import BlueLogo from "../assets/BlueLogo";
import { PrimeReactProvider } from "primereact/api";

export default function MainMenu(){
    return(
    <PrimeReactProvider>
        <MenuBar></MenuBar><br></br><br></br>
        <center><BlueLogo></BlueLogo></center>
    </PrimeReactProvider>
    );
}