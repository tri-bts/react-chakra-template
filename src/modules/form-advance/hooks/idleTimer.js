import { useCallback, useEffect, useState } from 'react';

const useIdle = () => {
  const [idleTime, setIdleTime] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  const timerIncrement = useCallback(() => {
    setIdleTime(idleTime + 1);
    setIsIdle(idleTime > 15);
  }, [idleTime]);

  useEffect(() => {
    const interval = setInterval(timerIncrement, 1000);
    const resetIdleTime = () => {
      setIdleTime(0);
    };

    window.addEventListener('mousemove', resetIdleTime);
    window.addEventListener('keypress', resetIdleTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetIdleTime);
      window.removeEventListener('keypress', resetIdleTime);
    };
  }, [timerIncrement]);

  return isIdle;
};

export default useIdle;
