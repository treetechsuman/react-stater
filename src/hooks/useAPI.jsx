import { useState, useCallback } from "react";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  return { execute, loading, error };
};
