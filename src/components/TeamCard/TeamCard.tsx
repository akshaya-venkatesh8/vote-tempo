import type { Team } from '../../types';
import styles from './TeamCard.module.scss';

interface Props {
  team: Team;
  onVote: () => void;
  disabled: boolean;
}

export default function TeamCard({ team, onVote, disabled }: Props) {
  return (
    <button className={styles.card} onClick={onVote} disabled={disabled}>
      <span className={styles.name}>{team.name}</span>
      <span className={styles.arrow}>→</span>
    </button>
  );
}
