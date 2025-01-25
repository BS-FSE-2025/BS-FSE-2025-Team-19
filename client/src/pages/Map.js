import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './Map.css';

const position = [32.0853, 34.7818]

export default function Map() {
  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
        {/* <div style={{width: 30, height: 30, backgroundColor: 'red'}}></div> */}
      </Marker>
    </MapContainer>
  )
}