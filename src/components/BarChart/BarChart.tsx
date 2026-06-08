import { useState } from 'react';
import type { Team } from '../../types';
import styles from './BarChart.module.scss';

interface Props {
  teams: Team[];
  totals: Record<string, number>;
  averages: Record<string, number>;
  distribution: Record<string, Record<number, number>>;
  voterCount: number;
}

export default function BarChart({ teams, totals, averages, distribution, voterCount }: Props) {
  const [openTeamId, setOpenTeamId] = useState<string | null>(null);
  const maxScore = Math.max(...teams.map((t) => totals[t.id] || 0), 1);
  const sorted = [...teams].sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0));

  const toggle = (teamId: string) => {
    setOpenTeamId((prev) => (prev === teamId ? null : teamId));
  };

  return (
    <div className={styles.chart}>
      {sorted.map((team, i) => {
        const total = totals[team.id] || 0;
        const avg = averages[team.id] ?? 0;
        const barPct = Math.round((total / maxScore) * 100);
        const isLeader = i === 0 && total > 0;
        const isOpen = openTeamId === team.id;
        const dist = distribution[team.id] || {};

        return (
          <div key={team.id} className={styles.teamBlock}>
            <button className={styles.row} onClick={() => toggle(team.id)}>
              <div className={styles.labelRow}>
                <span className={styles.name}>
                  {isLeader && <span className={styles.crown}>👑 </span>}
                  {team.name}
                </span>
                <div className={styles.scoreInfo}>
                  <span className={styles.stats}>{total} / {voterCount * 10} pts</span>
                  <span className={styles.avg}>avg {avg}/10</span>
                  <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>
              <div className={styles.track}>
                <div
                  className={`${styles.bar} ${isLeader ? styles.leader : ''}`}
                  style={{ width: `${barPct}%` }}
                />
              </div>
            </button>

            {isOpen && (
              <div className={styles.accordion}>
                <p className={styles.accordionTitle}>Score breakdown</p>
                <div className={styles.distributionGrid}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => {
                    const count = dist[score] || 0;
                    const pct = voterCount > 0 ? Math.round((count / voterCount) * 100) : 0;
                    return (
                      <div key={score} className={styles.distRow}>
                        <span className={styles.distScore}>{score}</span>
                        <div className={styles.distTrack}>
                          <div className={styles.distBar} style={{ width: `${pct}%` }} />
                        </div>
                        <span className={styles.distCount}>{count} {count === 1 ? 'person' : 'people'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {voterCount > 0 && (
        <p className={styles.voterNote}>{voterCount} voter{voterCount !== 1 ? 's' : ''} · max {voterCount * 10} pts possible</p>
      )}
    </div>
  );
}
