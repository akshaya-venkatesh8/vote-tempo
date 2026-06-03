import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { useRounds } from '../../hooks/useRounds';
import { useAdmin } from '../../hooks/useAdmin';
import RoundCard from '../../components/RoundCard/RoundCard';
import styles from './DashboardPage.module.scss';

interface Props {
  user: User;
}

export default function DashboardPage({ user }: Props) {
  const { rounds, loading } = useRounds();
  const { isAdmin } = useAdmin(user.uid);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>🕺</span>
          <span className={styles.brandName}>GOUMO</span>
        </div>
        <div className={styles.actions}>
          {isAdmin && (
            <button className={styles.adminBtn} onClick={() => navigate('/admin')}>
              📊 Results
            </button>
          )}
          <button className={styles.signOutBtn} onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <p className={styles.greeting}>
            Welcome, <strong>{user.displayName?.split(' ')[0]}</strong> 👋
          </p>
          <p className={styles.sub}>Tap a live round below to cast your vote</p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : rounds.length === 0 ? (
          <div className={styles.empty}>
            <span>🎭</span>
            <p>No rounds configured yet. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.rounds}>
            {rounds.map((round, i) => (
              <RoundCard
                key={round.id}
                round={round}
                roundNumber={i + 1}
                userId={user.uid}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
