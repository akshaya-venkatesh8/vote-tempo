import type { Team } from '../../types';
import styles from './TeamCard.module.scss';

interface Props {
  team: Team;
  onVote: () => void;
  disabled: boolean;
}

const FALLBACK_IMAGE = '/GouMo logo.jpg';

export default function TeamCard({ team, onVote, disabled }: Props) {
  return (
    <button className={styles.card} onClick={onVote} disabled={disabled}>
      <div className={styles.imageWrapper}>
        <img
          src={team.image || FALLBACK_IMAGE}
          alt={team.name}
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.footer}>
        <span className={styles.name}>{team.name}</span>
        <span className={styles.voteLabel}>Tap to vote →</span>
      </div>
    </button>
  );
}
