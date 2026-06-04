import { useState, useEffect } from 'react';
import { formatTimeRemaining, formatTimeUntilStart } from '../utils/timeRemaining';

export function useCountdown(endTime: Date): string {
  const [label, setLabel] = useState(() => formatTimeRemaining(endTime));

  useEffect(() => {
    setLabel(formatTimeRemaining(endTime));
    const interval = setInterval(() => {
      setLabel(formatTimeRemaining(endTime));
    }, 30000);
    return () => clearInterval(interval);
  }, [endTime]);

  return label;
}

export function useCountdownToStart(startTime: Date): string {
  const [label, setLabel] = useState(() => formatTimeUntilStart(startTime));

  useEffect(() => {
    setLabel(formatTimeUntilStart(startTime));
    const interval = setInterval(() => {
      setLabel(formatTimeUntilStart(startTime));
    }, 30000);
    return () => clearInterval(interval);
  }, [startTime]);

  return label;
}
