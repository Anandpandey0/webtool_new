// utils/fetchData.js
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('your_geojson_file_url');
    return response.data;
  } catch (error) {
    console.error('Error fetching GeoJSON data: ', error);
    return null;
  }
};

export default fetchData;
