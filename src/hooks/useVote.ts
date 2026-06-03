import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useVote(roundId: string, userId: string | undefined) {
  const [voted, setVoted] = useState(false);
  const [votedTeamId, setVotedTeamId] = useState<string | null>(null);
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
        setVotedTeamId(snap.data().teamId);
      }
      setLoading(false);
    });
  }, [roundId, userId]);

  const castVote = async (teamId: string) => {
    if (!userId || voted || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const ballotRef = doc(db, 'votes', roundId, 'ballots', userId);
      await setDoc(ballotRef, {
        userId,
        teamId,
        votedAt: serverTimestamp(),
      });
      setVoted(true);
      setVotedTeamId(teamId);
    } catch (e) {
      setError('Failed to submit vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return { voted, votedTeamId, loading, submitting, error, castVote };
}
