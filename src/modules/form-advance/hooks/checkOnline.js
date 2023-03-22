import { useCallback, useEffect, useState } from 'react';

const useOnline = () => {
  // Check online
  const [online, setOnline] = useState(null);

  const checkOnline = useCallback(e => {
    const { type } = e;
    setOnline(type === 'online');
  }, []);

  useEffect(() => {
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, [checkOnline]);

  return online;
};

export default useOnline;
