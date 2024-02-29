import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({latitude, longitude}) => {
    console.log('Entrouuu aqui');
    console.log(latitude)


    const [leafletLoaded, setLeafletLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('leaflet').then(() => {
                setLeafletLoaded(true);
            });
        }
    }, []);

    if (!leafletLoaded) {
        return <div>Carregando mapa...</div>;
    }

    return (
        
        <MapContainer center={[latitude,  longitude]} zoom={17} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;