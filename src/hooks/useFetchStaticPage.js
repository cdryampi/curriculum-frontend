import { useState, useEffect } from 'react';
import { fetchStaticPage } from '../api';

const useFetchStaticPage = (slug, delay) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStaticPage(slug);
        // Simula una demora adicional para mejorar la experiencia visual
        setTimeout(()=>{
            setData(response.data);
            setLoading(false);
        }, delay)

      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, delay]);

  return { data, loading, error };
};

export default useFetchStaticPage;
