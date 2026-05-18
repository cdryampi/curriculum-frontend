import { useState, useEffect, useCallback } from "react";

const useApi = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFn();
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    let cancelled = false;
    const call = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn();
        if (!cancelled) setData(response.data);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    call();
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error, refetch: execute };
};

export default useApi;
