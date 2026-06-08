import { useState } from 'react';
import type { User } from 'firebase/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useRounds } from '../../hooks/useRounds';
import { useVote } from '../../hooks/useVote';
import { getRoundStatus } from '../../utils/roundStatus';
import { useCountdown } from '../../hooks/useCountdown';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import styles from './VotePage.module.scss';

interface Props {
  user: User;
}

export default function VotePage({ user }: Props) {
  const { roundId } = useParams<{ roundId: string }>();
  const navigate = useNavigate();
  const { rounds } = useRounds();
  const round = rounds.find((r) => r.id === roundId);
  const { voted, submittedScores, loading, submitting, error, castVote } = useVote(
    roundId!,
    user.uid
  );

  const [scores, setScores] = useState<Record<string, number>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [initialised, setInitialised] = useState(false);
  const countdown = useCountdown(round?.endTime ?? new Date());

  if (!round) {
    return <div className="loading-screen"><div className="spinner" /></div>;
  }

  const status = getRoundStatus(round);

  // Once we know if the user voted, seed scores from submitted or default to 5
  if (!loading && !initialised) {
    const seed = submittedScores ?? {};
    const seeded = round.teams.reduce<Record<string, number>>((acc, team) => {
      acc[team.id] = seed[team.id] ?? 5;
      return acc;
    }, {});
    setScores(seeded);
    setInitialised(true);
  }

  const currentScores = round.teams.reduce<Record<string, number>>((acc, team) => {
    acc[team.id] = scores[team.id] ?? 5;
    return acc;
  }, {});

  if (status === 'upcoming') {
    return (
      <div className={styles.statusScreen}>
        <span className={styles.emoji}>⏳</span>
        <h2>Voting hasn't started yet</h2>
        <p>Opens at {round.startTime.toLocaleString()}</p>
        <button onClick={() => navigate('/dashboard')}>← Back</button>
      </div>
    );
  }

  if (status === 'closed') {
    if (!loading && voted && submittedScores) {
      return (
        <div className={styles.confirmation}>
          <span className={styles.emoji}>✅</span>
          <h2>Your Scores</h2>
          <p className={styles.confirmSub}>Voting is now closed.</p>
          <div className={styles.submittedList}>
            {round.teams.map((team) => (
              <div key={team.id} className={styles.submittedRow}>
                <span>{team.name}</span>
                <strong>{submittedScores[team.id]} / 10</strong>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        </div>
      );
    }
    return (
      <div className={styles.statusScreen}>
        <span className={styles.emoji}>🔒</span>
        <h2>Voting is closed</h2>
        <p>This round has ended.</p>
        <button onClick={() => navigate('/dashboard')}>← Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>←</button>
        <div>
          <h1 className={styles.title}>{round.title}</h1>
          <div className={styles.liveMeta}>
            <span className={styles.live}>🟢 Live</span>
            <span className={styles.timeLeft}>🕐 {countdown}</span>
          </div>
        </div>
      </header>

      <p className={styles.instruction}>Who do you think should win?</p>
      <p className={styles.hint}>
        Score each team from 1 to 10
        {voted && <span className={styles.editNote}> · You can update your scores while voting is open</span>}
      </p>

      <p className={styles.autoNote}>💾 Save anytime — your last saved scores are final when the round closes.</p>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.teams}>
        {round.teams.map((team) => (
          <ScoreCard
            key={team.id}
            team={team}
            score={currentScores[team.id]}
            onChange={(val) => setScores((prev) => ({ ...prev, [team.id]: val }))}
            disabled={submitting || loading}
          />
        ))}
      </div>

      <div className={styles.submitRow}>
        <button
          className={styles.submitBtn}
          onClick={() => setShowConfirm(true)}
          disabled={submitting || loading}
        >
          {submitting ? 'Saving…' : voted ? 'Save updated scores →' : 'Save scores →'}
        </button>
      </div>

      {showConfirm && (
        <ConfirmDialog
          teams={round.teams}
          scores={currentScores}
          isUpdate={voted}
          onConfirm={() => {
            castVote(currentScores);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
