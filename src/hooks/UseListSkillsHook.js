// src/hooks/UseListSkillsHook.js
import { useState, useEffect } from "react";
import { fetchSkills } from "../api";

const UseListSkillsHook = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSkills()
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

export default UseListSkillsHook;
