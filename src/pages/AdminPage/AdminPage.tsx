import type { User } from 'firebase/auth';
import { useRounds } from '../../hooks/useRounds';
import AdminRoundResults from '../../components/AdminRoundResults/AdminRoundResults';
import AppHeader from '../../components/AppHeader/AppHeader';
import styles from './AdminPage.module.scss';

interface Props {
  user: User;
}

export default function AdminPage({ user: _user }: Props) {
  const { rounds, loading } = useRounds();

  return (
    <div className={styles.container}>
      <AppHeader isAdmin pageTitle="Results" />

      <main className={styles.main}>
        <p className={styles.adminNote}>Admin view · Updates in real time</p>

        {loading ? (
          <div className="spinner" />
        ) : rounds.length === 0 ? (
          <p className={styles.empty}>No rounds configured yet.</p>
        ) : (
          <div className={styles.rounds}>
            {rounds.map((round, i) => (
              <AdminRoundResults key={round.id} round={round} roundNumber={i + 1} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
