import styles from './ConfirmDialog.module.scss';

interface Props {
  teamName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ teamName, onConfirm, onCancel }: Props) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>🗳️</div>
        <h2 className={styles.heading}>Confirm your vote</h2>
        <p className={styles.team}>{teamName}</p>
        <p className={styles.warning}>
          ⚠️ This is final. You cannot change your vote once submitted.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Go back
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Yes, cast my vote
          </button>
        </div>
      </div>
    </div>
  );
}
