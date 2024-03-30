/*
Name: ParkingMap.js
Description:  Parking map page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/03/23
*/

import ReactDOM from 'react-dom'
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from "leaflet";
import {BrowserRouter as Router, useNavigate} from 'react-router-dom';
import { Button } from 'primereact/button';

const coordinates = [38.9500,-95.2510];
const lot90 = [38.952520, -95.250020];
const lotAFPK = [38.955233, -95.252906];
const lot16 = [38.959042, -95.242745];

var lot90Icon = L.Icon.extend({
  options: {
       iconUrl: require('./map-img/icon90.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });
var lotAFPKIcon = L.Icon.extend({
  options: {
       iconUrl: require('./map-img/iconAFPK.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });

var lot16Icon = L.Icon.extend({
  options: {
       iconUrl: require('./map-img/icon16.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });


export default function App() {
  const navigate = useNavigate();

  const handlePopupClick = (lotName) => {
    navigate('/availability', { state: { selectedLotId: lotName }});
  }

    return ( 
    <div>
      <style>
      {`
        .widthAdjustment {
          width: 210px;
        }

        .fixZoomGlitch {
          height: calc(100vh-65px);
        }
      `}
      </style>
      <title>Parking Map | ParkSense</title>
      <MapContainer center={coordinates} zoom={12} className="fixZoomGlitch">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lot90} icon={new lot90Icon()} eventHandlers={{
      click: () => {
        console.log('marker clicked')
      },
    }}>
        </Marker>

        <Marker position={lot90} icon={new lot90Icon()}>
          <Popup>
              <span>
                <h2 style={{margin: 0, marginBottom: '5px'}}>Rec Center</h2>
                <h4 style={{margin: 0, marginBottom: '10px'}}>Lot 90</h4>
                <Button label="Lot Information" onClick={()=>handlePopupClick("Rec Center (Lot 90)")}></Button>
              </span>
          </Popup>
        </Marker>

        <Marker position={lotAFPK} icon={new lotAFPKIcon()}>
          <Popup className="widthAdjustment">
              <span>
                <h2 style={{margin: 0, marginBottom: '5px'}}>Allen Fieldhouse Parking Garage</h2>
                <h4 style={{margin: 0, marginBottom: '10px'}}>AFPK</h4>
                <Button label="Lot Information" onClick={()=>handlePopupClick("Allen Fieldhouse Parking Garage (AFPK)")}></Button>
              </span>
          </Popup>
        </Marker>

        <Marker position={lot16} icon={new lot16Icon()}>
          <Popup>
              <span>
                <h2 style={{margin: 0, marginBottom: '5px'}}>East Kansas Union</h2>
                <h4 style={{margin: 0, marginBottom: '10px'}}>Lot 16</h4>
                <Button label="Lot Information" onClick={()=>handlePopupClick("E. Kansas Union (Lot 16)")}></Button>
              </span>
          </Popup>
        </Marker>
      </MapContainer>;
    </div>)
}
ReactDOM.render(
  <Router>
    <App/>
  </Router>,
    document.getElementById('root')
);
