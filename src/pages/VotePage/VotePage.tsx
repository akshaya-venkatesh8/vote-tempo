import { useState } from 'react';
import type { User } from 'firebase/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useRounds } from '../../hooks/useRounds';
import { useVote } from '../../hooks/useVote';
import { getRoundStatus } from '../../utils/roundStatus';
import TeamCard from '../../components/TeamCard/TeamCard';
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
  const { voted, votedTeamId, loading, submitting, error, castVote } = useVote(
    roundId!,
    user.uid
  );
  const [pendingTeamId, setPendingTeamId] = useState<string | null>(null);
  const pendingTeam = round?.teams.find((t) => t.id === pendingTeamId);

  if (!round) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  const status = getRoundStatus(round);

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
    return (
      <div className={styles.statusScreen}>
        <span className={styles.emoji}>🔒</span>
        <h2>Voting is closed</h2>
        <p>This round has ended.</p>
        <button onClick={() => navigate('/dashboard')}>← Back</button>
      </div>
    );
  }

  if (!loading && voted) {
    const votedTeam = round.teams.find((t) => t.id === votedTeamId);
    return (
      <div className={styles.confirmation}>
        <span className={styles.emoji}>✅</span>
        <h2>Vote Submitted!</h2>
        <p>
          You voted for <strong>{votedTeam?.name}</strong>
        </p>
        <p className={styles.sub}>Your vote has been recorded. Thank you!</p>
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <div>
          <h1 className={styles.title}>{round.title}</h1>
          <span className={styles.live}>🟢 Voting Live</span>
        </div>
      </header>

      <p className={styles.instruction}>Who do you think should win?</p>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.teams}>
        {round.teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onVote={() => setPendingTeamId(team.id)}
            disabled={submitting || loading}
          />
        ))}
      </div>

      {submitting && <p className={styles.submitting}>Submitting your vote...</p>}

      {pendingTeam && (
        <ConfirmDialog
          teamName={pendingTeam.name}
          onConfirm={() => {
            castVote(pendingTeam.id);
            setPendingTeamId(null);
          }}
          onCancel={() => setPendingTeamId(null)}
        />
      )}
    </div>
  );
}
