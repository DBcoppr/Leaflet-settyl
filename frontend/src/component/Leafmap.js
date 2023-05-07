import React, { useEffect, useState } from "react";
import axios from "axios"
// import MarkerClusterGroup from 'react-leaflet-cluster'
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
    const [center, setCenter] = useState({ lat: 51.0, lng: 19.0 });
    const ZOOM_LEVEL = 2;
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
                    <h2>My employee address</h2>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                            {
                                edata.map((item,index) => (
                                    <>
                                            {item.location.coordinates[0] &&
                                                <Marker position={item.location.coordinates} icon={myIcon} key={index}>
                                                    <Popup>
                                                    Id:<a href="">{item._id}</a>
                                                        <p style={{ paddingBottom: "0px" }}>Name:{item.name}</p>
                                                        <p>Address:{item.address}</p>
                                                    </Popup>
                                                </Marker>
                                            }  
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