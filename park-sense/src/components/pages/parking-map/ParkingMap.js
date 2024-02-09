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


const coordinates = [38.9500,-95.2510];

class App extends Component {

  render() {

    return <MapContainer center={coordinates} zoom={12} style={{height: '850px'}}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
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
