// src/hooks/UseListPortfolioHook.js
import { useState, useEffect } from "react";
import { fetchPortfolioList } from "../api";

const UseListPortfolioHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioList()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default UseListPortfolioHook;
