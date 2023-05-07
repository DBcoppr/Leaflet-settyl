import React, { useEffect, useState } from "react";
import axios from "axios"
// import MarkerClusterGroup from 'react-leaflet-cluster'
import MarkerClusterGroup from "leaflet.markercluster";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-provider";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet'
const myIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [25, 32]
})

const BasicMap = () => {
    const [edata, setEdata] = useState([])
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 4;
    const mapRef = useRef();
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("http://localhost:8000/getalldata")
            setEdata(data);
        })();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [])


    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Basic Openstreet Maps</h2>
                    <p>Loading basic map using layer from maptiler</p>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                            {
                                edata.map((item,index) => (
                                    <>
                                        <MarkerClusterGroup
                                        
                                        >
                                            {item.location.coordinates[0] &&
                                                <Marker position={item.location.coordinates} icon={myIcon} key={index}>
                                                    <Popup>
                                                        <p style={{ paddingBottom: "0px" }}>Name:{item.name}</p>
                                                        <p>Address:{item.address}</p>
                                                    </Popup>
                                                </Marker>

                                            }
                                        </MarkerClusterGroup>
                                    </>
                                )

                                )
                            }

                            {/* <MarkerClusterGroup>
        <Marker position={[49.8397, 24.0297]} />
        <Marker position={[52.2297, 21.0122]} />
        <Marker position={[51.5074, -0.0901]} />
      </MarkerClusterGroup> */}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicMap;