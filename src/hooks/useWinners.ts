import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Winners, Round } from '../types';

export function useWinners(rounds: Round[]) {
  const [winners, setWinners] = useState<Winners | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onSnapshot(doc(db, 'config', 'winners'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Winners & { showEnded?: boolean };
        const allRoundsEnded = rounds.length > 0 && rounds.every((r) => new Date() > r.endTime);
        setWinners(data.showEnded && allRoundsEnded ? data : null);
      } else {
        setWinners(null);
      }
      setLoading(false);
    });
  }, [rounds]);

  return { winners, loading };
}
