// src/hooks/ListStaticPages.js
import { useState, useEffect } from "react";
import { fetchStaticPages } from "../api";

const ListStaticPages = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStaticPages()
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};

export default ListStaticPages;
