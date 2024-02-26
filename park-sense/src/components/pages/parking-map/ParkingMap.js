/*
Name: ParkingMap.js
Description:  Parking map page
Authors: Troy D'Amico, Sam Aldeguer, Aaron Horton
Date: 10/03/23
*/

import ReactDOM from 'react-dom'
import PropTypes                         from 'prop-types';
import React, { Component }              from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
//import lot90Icon from './../../../img/map-img/icon90.png';
import L from "leaflet";


const coordinates = [38.9500,-95.2510];
const lot90 = [38.952520, -95.250020];
const lot91 = [38.960544, -95.244769];
const lot92 = [38.962088, -95.244967];

/*const lot90Icon = new L.Icon({
    //img src={AboutImage}
    iconURL: require("./../../../img/map-img/icon90.png"),
    //iconURL: lot90Icon,
    iconSize: [35,35],
    //iconAnchor: [17,46],
    //popupAnchor: [3,-46]
});*/
//var lot90Icon = L.icon({iconURL:'./../../../img/map-img/icon90.png'});
var lot90Icon = L.Icon.extend({
  options: {
       //iconUrl: './../../../../img/map-img/icon90.png',
       //iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
       iconUrl: require('./map-img/icon90.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       //shadowSize: new L.Point(68, 95),
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });
var lot91Icon = L.Icon.extend({
  options: {
       //iconUrl: './../../../../img/map-img/icon90.png',
       //iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
       iconUrl: require('./map-img/icon91.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       //shadowSize: new L.Point(68, 95),
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });

var lot92Icon = L.Icon.extend({
  options: {
       //iconUrl: './../../../../img/map-img/icon90.png',
       //iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
       iconUrl: require('./map-img/icon92.png'),
       iconSize: new L.Point(32, 32),
       opacity: 0.5,
       //shadowSize: new L.Point(68, 95),
       iconAnchor: new L.Point(16, 16),
       popupAnchor: new L.Point(0, -18)
     }
   });


class App extends Component {

  render() {

    return <MapContainer center={coordinates} zoom={12} style={{height: '850px'}}>
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

      <Marker position={lot91} icon={new lot91Icon()}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
      </Marker>

      <Marker position={lot92} icon={new lot92Icon()}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
      </Marker>


    </MapContainer>;

  }
}

export default App;
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

/*

export default function ParkingMap(){
  return(
      <div>
      <title>Parking Map | ParkSense</title>
      <p>ParkingMap Component</p>
      </div>
  );
}*/
