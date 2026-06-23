import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import styles from './AppHeader.module.scss';

interface Props {
  pageTitle?: string;
  isAdmin?: boolean;
}

export default function AppHeader({ pageTitle, isAdmin = false }: Props) {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/GouMo logo.jpg" alt="GouMo" className={styles.logo} />
        <div className={styles.brandText}>
          <span className={styles.brandName}>GouMo Dance Chronicles</span>
          <span className={styles.brandYear}>Annual Showcase 2026</span>
        </div>
        {!isAdmin && (
          <button className={styles.signOut} onClick={() => signOut(auth)}>
            Sign out
          </button>
        )}
      </div>

      {isAdmin && pageTitle && (
        <>
          <div className={styles.gap} />
          <div className={styles.actions}>
            <button className={styles.back} onClick={() => navigate('/dashboard')}>← Dashboard</button>
            <span className={styles.pageTitle}>{pageTitle}</span>
            <button className={styles.signOut} onClick={() => signOut(auth)}>
              Sign out
            </button>
          </div>
        </>
      )}
    </header>
  );
}
