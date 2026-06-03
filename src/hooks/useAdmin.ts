import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useAdmin(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    getDoc(doc(db, 'admins', userId)).then((snap) => {
      setIsAdmin(snap.exists());
      setLoading(false);
    });
  }, [userId]);

  return { isAdmin, loading };
}
