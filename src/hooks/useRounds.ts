import { useState, useEffect } from 'react';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Round } from '../types';

export function useRounds() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onSnapshot(collection(db, 'rounds'), (snap) => {
      const data = snap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          teams: d.teams,
          startTime: (d.startTime as Timestamp).toDate(),
          endTime: (d.endTime as Timestamp).toDate(),
        } as Round;
      });
      data.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      setRounds(data);
      setLoading(false);
    });
  }, []);

  return { rounds, loading };
}
