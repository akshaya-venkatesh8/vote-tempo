import type { Round } from '../../types';
import { getRoundStatus } from '../../utils/roundStatus';
import { useAdminResults } from '../../hooks/useAdminResults';
import BarChart from '../BarChart/BarChart';
import styles from './AdminRoundResults.module.scss';

interface Props {
  round: Round;
  roundNumber: number;
}

export default function AdminRoundResults({ round, roundNumber }: Props) {
  const status = getRoundStatus(round);
  const { results, total } = useAdminResults(round.id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles.roundLabel}>Round {roundNumber}</p>
          <h2 className={styles.title}>{round.title}</h2>
        </div>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
          {status === 'upcoming' ? '⏳ Upcoming' : status === 'active' ? '🟢 Live' : '🔒 Final'}
        </span>
      </div>

      <p className={styles.total}>
        Total votes: <strong>{total}</strong>
        {status === 'active' && <span className={styles.pulse}> · Live</span>}
      </p>

      {total === 0 ? (
        <p className={styles.noVotes}>No votes yet.</p>
      ) : (
        <BarChart teams={round.teams} results={results} total={total} />
      )}
    </div>
  );
}
