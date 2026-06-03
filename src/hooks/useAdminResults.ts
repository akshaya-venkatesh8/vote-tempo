import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useAdminResults(roundId: string) {
  const [results, setResults] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    return onSnapshot(collection(db, 'votes', roundId, 'ballots'), (snap) => {
      const counts: Record<string, number> = {};
      snap.docs.forEach((doc) => {
        const teamId = doc.data().teamId as string;
        counts[teamId] = (counts[teamId] || 0) + 1;
      });
      setResults(counts);
      setTotal(snap.size);
    });
  }, [roundId]);

  return { results, total };
}
