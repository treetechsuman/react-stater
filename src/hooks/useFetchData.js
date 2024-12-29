// hooks/useFetchData.js
import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData(endpoint);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;
