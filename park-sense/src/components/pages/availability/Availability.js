import LotDropdown from "./LotDropdown"
import LotStatus from "./LotStatus"

export default function Availability(){
    return(
        <center>
            <LotDropdown></LotDropdown>
            <LotStatus></LotStatus>
        </center>
    );
}