export default function formatDate(timestamp)  {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };
  
  export  function firstCharToLowerCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }


  export const fetchData = async () => {
    try {
      const response = await axios.get('your_geojson_file_url');
      return response.data;
    } catch (error) {
      console.error('Error fetching GeoJSON data: ', error);
    }
  };


  