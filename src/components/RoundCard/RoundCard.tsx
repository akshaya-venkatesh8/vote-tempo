import { useNavigate } from 'react-router-dom';
import type { Round } from '../../types';
import { getRoundStatus } from '../../utils/roundStatus';
import { useVote } from '../../hooks/useVote';
import { useCountdown, useCountdownToStart } from '../../hooks/useCountdown';
import styles from './RoundCard.module.scss';

interface Props {
  round: Round;
  roundNumber: number;
  userId: string;
}

export default function RoundCard({ round, roundNumber, userId }: Props) {
  const status = getRoundStatus(round);
  const { voted, loading } = useVote(round.id, userId);
  const navigate = useNavigate();
  const countdown = useCountdown(round.endTime);
  const countdownToStart = useCountdownToStart(round.startTime);

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <span className={styles.roundNum}>Round {roundNumber}</span>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
          {status === 'upcoming' ? '⏳ Upcoming' : status === 'active' ? '🟢 Live' : '🔒 Closed'}
        </span>
      </div>

      <h3 className={styles.title}>{round.title}</h3>
      <p className={styles.meta}>{round.teams.length} teams competing</p>

      {status === 'upcoming' && (
        <p className={styles.countdown}>🕐 {countdownToStart}</p>
      )}
      {status === 'closed' && (
        <p className={styles.time}>Ended {round.endTime.toLocaleString()}</p>
      )}

      {!loading && status === 'active' && (
        <>
          {voted ? (
            <button className={styles.updateBtn} onClick={() => navigate(`/vote/${round.id}`)}>
              ✅ Scores saved · Update →
            </button>
          ) : (
            <button className={styles.voteBtn} onClick={() => navigate(`/vote/${round.id}`)}>
              Vote Now →
            </button>
          )}
          <p className={styles.countdown}>🕐 {countdown}</p>
        </>
      )}
    </div>
  );
}
