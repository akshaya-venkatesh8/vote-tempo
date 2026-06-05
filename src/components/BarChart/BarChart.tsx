import type { Team } from '../../types';
import styles from './BarChart.module.scss';

interface Props {
  teams: Team[];
  totals: Record<string, number>;
  voterCount: number;
}

export default function BarChart({ teams, totals, voterCount }: Props) {
  const maxScore = Math.max(...teams.map((t) => totals[t.id] || 0), 1);
  const sorted = [...teams].sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0));

  return (
    <div className={styles.chart}>
      {sorted.map((team, i) => {
        const total = totals[team.id] || 0;
        const barPct = Math.round((total / maxScore) * 100);
        const isLeader = i === 0 && total > 0;

        return (
          <div key={team.id} className={styles.row}>
            <div className={styles.labelRow}>
              <span className={styles.name}>
                {isLeader && <span className={styles.crown}>👑 </span>}
                {team.name}
              </span>
              <span className={styles.stats}>{total} / {voterCount * 10} pts</span>
            </div>
            <div className={styles.track}>
              <div
                className={`${styles.bar} ${isLeader ? styles.leader : ''}`}
                style={{ width: `${barPct}%` }}
              />
            </div>
          </div>
        );
      })}
      {voterCount > 0 && (
        <p className={styles.voterNote}>{voterCount} voter{voterCount !== 1 ? 's' : ''} · max {voterCount * 10} pts possible</p>
      )}
    </div>
  );
}
