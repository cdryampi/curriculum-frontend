// src/hooks/UseLaboralExperienceListHook.js
import { useState, useEffect } from "react";
import { fetchLaboralExperience } from "../api";

const UseLaboralExperienceList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLaboralExperience()
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

export default UseLaboralExperienceList;
