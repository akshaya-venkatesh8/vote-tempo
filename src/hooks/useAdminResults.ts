import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface AdminResults {
  totals: Record<string, number>; // teamId -> total score
  voterCount: number;
}

export function useAdminResults(roundId: string): AdminResults {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [voterCount, setVoterCount] = useState(0);

  useEffect(() => {
    return onSnapshot(collection(db, 'votes', roundId, 'ballots'), (snap) => {
      const sums: Record<string, number> = {};
      let count = 0;
      snap.docs.forEach((doc) => {
        const scores = doc.data().scores as Record<string, number> | undefined;
        if (!scores) return; // skip old single-vote ballots
        count++;
        Object.entries(scores).forEach(([teamId, score]) => {
          sums[teamId] = (sums[teamId] || 0) + score;
        });
      });
      setTotals(sums);
      setVoterCount(count);
    });
  }, [roundId]);

  return { totals, voterCount };
}
