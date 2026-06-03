import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useRounds } from '../../hooks/useRounds';
import AdminRoundResults from '../../components/AdminRoundResults/AdminRoundResults';
import styles from './AdminPage.module.scss';

interface Props {
  user: User;
}

export default function AdminPage({ user: _user }: Props) {
  const { rounds, loading } = useRounds();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1 className={styles.heading}>📊 Live Results</h1>
        <button className={styles.signOut} onClick={() => signOut(auth)}>
          Sign out
        </button>
      </header>

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
