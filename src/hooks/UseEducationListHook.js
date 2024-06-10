// src/hooks/UseEducationList.js
import { useState, useEffect } from "react";
import { fetchEducationList } from "../api";

const UseEducationList= (delay = 0) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchEducationList();
                // Simula una demora adicional para mejorar la experiencia visual
                setTimeout(() => {
                    setData(response.data);
                    setLoading(false);
                }, delay); // Retraso basado en el parámetro `delay`
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [delay]);

    return { data, loading, error };
};

export default UseEducationList;
