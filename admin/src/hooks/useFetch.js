import { useState, useCallback } from 'react';

export const useFetch = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFunc(...args);
      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { execute, loading, error };
};
