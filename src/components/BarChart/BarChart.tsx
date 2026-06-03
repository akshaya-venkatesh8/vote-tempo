import type { Team } from '../../types';
import styles from './BarChart.module.scss';

interface Props {
  teams: Team[];
  results: Record<string, number>;
  total: number;
}

export default function BarChart({ teams, results, total }: Props) {
  const sorted = [...teams].sort(
    (a, b) => (results[b.id] || 0) - (results[a.id] || 0)
  );

  return (
    <div className={styles.chart}>
      {sorted.map((team, i) => {
        const count = results[team.id] || 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const isLeader = i === 0 && count > 0;

        return (
          <div key={team.id} className={styles.row}>
            <div className={styles.labelRow}>
              <span className={styles.name}>
                {isLeader && <span className={styles.crown}>👑 </span>}
                {team.name}
              </span>
              <span className={styles.stats}>
                {count} vote{count !== 1 ? 's' : ''} · {pct}%
              </span>
            </div>
            <div className={styles.track}>
              <div
                className={`${styles.bar} ${isLeader ? styles.leader : ''}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
