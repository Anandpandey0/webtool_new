const { Marker } = require("react-leaflet");

function AddMarkerToClick() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
    },
  });
  
  return (
    position.latitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
        icon={mapIcon}
      />
    ) : null
  ); }