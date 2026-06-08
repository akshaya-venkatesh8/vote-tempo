import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface AdminResults {
  totals: Record<string, number>;        // teamId -> total score
  averages: Record<string, number>;      // teamId -> average score (1 dp)
  distribution: Record<string, Record<number, number>>; // teamId -> score -> count
  voterCount: number;
}

export function useAdminResults(roundId: string): AdminResults {
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [averages, setAverages] = useState<Record<string, number>>({});
  const [distribution, setDistribution] = useState<Record<string, Record<number, number>>>({});
  const [voterCount, setVoterCount] = useState(0);

  useEffect(() => {
    return onSnapshot(collection(db, 'votes', roundId, 'ballots'), (snap) => {
      const sums: Record<string, number> = {};
      const counts: Record<string, number> = {};
      const dist: Record<string, Record<number, number>> = {};
      let voters = 0;

      snap.docs.forEach((doc) => {
        const scores = doc.data().scores as Record<string, number> | undefined;
        if (!scores) return;
        voters++;
        Object.entries(scores).forEach(([teamId, score]) => {
          sums[teamId] = (sums[teamId] || 0) + score;
          counts[teamId] = (counts[teamId] || 0) + 1;
          if (!dist[teamId]) dist[teamId] = {};
          dist[teamId][score] = (dist[teamId][score] || 0) + 1;
        });
      });

      const avgs: Record<string, number> = {};
      Object.keys(sums).forEach((teamId) => {
        avgs[teamId] = Math.round((sums[teamId] / counts[teamId]) * 10) / 10;
      });

      setTotals(sums);
      setAverages(avgs);
      setDistribution(dist);
      setVoterCount(voters);
    });
  }, [roundId]);

  return { totals, averages, distribution, voterCount };
}
