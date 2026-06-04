import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    // Wait for any pending redirect result to resolve first,
    // then subscribe to auth state — prevents a flash to login page
    getRedirectResult(auth)
      .catch((e) => console.error('Redirect sign-in error:', e))
      .finally(() => {
        unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
      });

    return () => unsubscribe?.();
  }, []);

  return { user, loading };
}
