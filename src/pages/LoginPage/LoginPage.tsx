import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Sign-in error:', e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🕺</div>
        <h1>GOUMO</h1>
        <p className={styles.subtitle}>Dance Competition Voting</p>
        <button className={styles.googleBtn} onClick={handleGoogleSignIn}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Sign in with Google
        </button>
        <p className={styles.note}>One account · One vote per round</p>
      </div>
    </div>
  );
}
