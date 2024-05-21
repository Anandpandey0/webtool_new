// useBhoomiscoreData.js

import { useState, useEffect } from 'react';

export function useBhoomiscoreData() {
  const [bhoomiscoreData, setBhoomiscoreData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getBhoomiScoreDb'); // Assuming the API route is '/api/bhoomiscore'
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBhoomiscoreData(data);
      } catch (error) {
        console.error('Error fetching bhoomiscore data:', error);
      }
    };

    fetchData();
  }, []);

  return bhoomiscoreData;
}
