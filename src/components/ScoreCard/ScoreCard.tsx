import type { Team } from '../../types';
import styles from './ScoreCard.module.scss';

interface Props {
  team: Team;
  score: number;
  onChange: (score: number) => void;
  disabled: boolean;
}

const FALLBACK_IMAGE = '/GouMo logo.jpg';

export default function ScoreCard({ team, score, onChange, disabled }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={team.image || FALLBACK_IMAGE}
          alt={team.name}
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{team.name}</span>
        <span className={styles.score}>{score}<span className={styles.outOf}>/10</span></span>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={score}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.slider}
          style={{ '--pct': `${((score - 1) / 9) * 100}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
