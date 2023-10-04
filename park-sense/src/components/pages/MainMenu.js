import MainNavBar from "../page-structure/MainNavBar";
import BlueLogo from "../assets/BlueLogo";
import { PrimeReactProvider } from "primereact/api";

export default function MainMenu(){
    return(
    <PrimeReactProvider>
        <MainNavBar></MainNavBar><br></br><br></br>
        <center><BlueLogo></BlueLogo></center>
    </PrimeReactProvider>
    );
}