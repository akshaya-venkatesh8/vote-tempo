import type { Team } from '../../types';
import styles from './ConfirmDialog.module.scss';

interface Props {
  teams: Team[];
  scores: Record<string, number>;
  isUpdate?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ teams, scores, isUpdate = false, onConfirm, onCancel }: Props) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>{isUpdate ? '✏️' : '🗳️'}</div>
        <h2 className={styles.heading}>{isUpdate ? 'Update your scores?' : 'Submit your scores?'}</h2>
        <p className={styles.sub}>
          {isUpdate
            ? 'Your previous scores will be replaced.'
            : '⚠️ You can update your scores while voting is open.'}
        </p>

        <div className={styles.scoreList}>
          {teams.map((team) => (
            <div key={team.id} className={styles.row}>
              <span className={styles.teamName}>{team.name}</span>
              <span className={styles.teamScore}>{scores[team.id]} / 10</span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Go back</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>{isUpdate ? 'Save updated scores' : 'Save scores'}</button>
        </div>
      </div>
    </div>
  );
}
