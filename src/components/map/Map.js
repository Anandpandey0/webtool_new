import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  GeoJSON,
  useMapEvents,
  Marker,
} from "react-leaflet";
import leafletPip from "leaflet-pip";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geojsonRaw from "../../data/mean_ndvi_district_wise_UK_Apr_May_2024.geojson"; // Ensure this path is correct

// Parse the raw GeoJSON content
const importedGeojsonData = JSON.parse(geojsonRaw);

function AddMarkerToClick({ geojsonData ,sendDataToParent }) {
  const [position, setPosition] = useState(null);
  const [popupContent, setPopupContent] = useState("");
  const [meanNdviValue , setMeanNdviValue] = useState('')

  useMapEvents({
    click(event) {
      // console.log(event);
      const { lat, lng } = event.latlng;
      const layer = L.geoJSON(geojsonData);
      const results = leafletPip.pointInLayer([lng, lat], layer);
      let content = "No data available";

      if (results.length > 0) {
        const properties = results[0].feature.properties;
        content = `NDVI: ${properties.mean_ndvi}`;
        setMeanNdviValue(properties.mean_ndvi)
        // console.log(`NDVI at clicked location: ${properties.mean_ndvi}`);
        
      }

      setPosition([lat, lng]);
      setPopupContent(content);
    },
  });
  useEffect(()=>{
    const sendData = () => {
      const data = meanNdviValue;
      sendDataToParent(data); // Call the function passed from the parent and pass data
    };
    sendData()
  },[meanNdviValue])

  return position ? (
    <Marker position={position}>
      <Popup>{popupContent}</Popup>
    </Marker>
  ) : null;
}

function Map() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [parentKeys, setParentKeys] = useState(null);
  const [childKeys, setChildKeys] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");

  useEffect(() => {
    setGeojsonData(importedGeojsonData);
    function getKeys(jsonObject) {
      return Object.keys(jsonObject);
    }
    setParentKeys(getKeys(importedGeojsonData));
    setChildKeys(getKeys(importedGeojsonData.features[0].properties));
  }, []);

  const handleMapClick = (event) => {
    // console.log("Clicked at:", event.latlng); // Log the coordinates of the clicked point
  };
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // useEffect(()=>{
  //   // console.log("Data from child:",dataFromChild)
  // },[dataFromChild])

  return (
    <main className="d w-[100%] h-[100vh] z-1">
      <div>
        <MapContainer
          center={[30.0668, 79.0193]}
          zoom={8}
          onClick={handleMapClick} // Attach the click event handler
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render GeoJSON data if available */}
          {geojsonData && (
            <GeoJSON data={geojsonData} style={{ color: "blue" }}>
              {/* <Popup>
                <p>{dataFromChild}</p>
              </Popup> */}
              {console.log(dataFromChild)}
            </GeoJSON>
          )}

          <CircleMarker
            className="n w-[150px] h-[150px]"
            center={[30.0668, 79.0193]}
            radius={10}
            color="transparent"
            fillColor="green"
            fillOpacity={0.5}
          >
            <Popup className="w-[460px] h-[150px]">
              <p className="text-[25px]">My Location</p>
            </Popup>
          </CircleMarker>

          <AddMarkerToClick geojsonData={geojsonData} sendDataToParent={handleDataFromChild} />
        </MapContainer>
      </div>
      {/* {console.log("ParentKeys , ", parentKeys)} */}
      {/* {console.log("ChildKeys , ", childKeys)} */}
    </main>
  );
}

export default Map;
