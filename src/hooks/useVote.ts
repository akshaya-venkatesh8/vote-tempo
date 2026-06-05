import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useVote(roundId: string, userId: string | undefined) {
  const [voted, setVoted] = useState(false);
  const [submittedScores, setSubmittedScores] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !roundId) {
      setLoading(false);
      return;
    }
    const ballotRef = doc(db, 'votes', roundId, 'ballots', userId);
    getDoc(ballotRef).then((snap) => {
      if (snap.exists()) {
        setVoted(true);
        setSubmittedScores(snap.data().scores ?? null);
      }
      setLoading(false);
    });
  }, [roundId, userId]);

  const castVote = async (scores: Record<string, number>) => {
    if (!userId || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const ballotRef = doc(db, 'votes', roundId, 'ballots', userId);
      await setDoc(ballotRef, {
        userId,
        scores,
        votedAt: serverTimestamp(),
      });
      setVoted(true);
      setSubmittedScores(scores);
    } catch (e) {
      setError('Failed to submit scores. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return { voted, submittedScores, loading, submitting, error, castVote };
}
