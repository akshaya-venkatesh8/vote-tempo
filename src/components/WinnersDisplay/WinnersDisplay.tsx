import { useState } from 'react';
import type { Winners, WinnerEntry } from '../../types';
import styles from './WinnersDisplay.module.scss';

interface Props {
  winners: Winners;
}

const MEDALS = ['🥇', '🥈', '🥉'];

function WinnerCard({ entry, label, medal }: { entry: WinnerEntry; label: string; medal: string }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        {entry.image && !imgLoaded && <div className={styles.imgPlaceholder} />}
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.name}
            className={styles.image}
            onLoad={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0 }}
          />
        ) : (
          <div className={styles.imgFallback}>{medal}</div>
        )}
      </div>
      <span className={styles.medal}>{medal}</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.name}>{entry.name}</span>
    </div>
  );
}

function CategorySection({ title, entries }: { title: string; entries: { entry: WinnerEntry; label: string; medal: string }[] }) {
  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={styles.cards}>
        {entries.map((e) => (
          <WinnerCard key={e.label} {...e} />
        ))}
      </div>
    </div>
  );
}

export default function WinnersDisplay({ winners }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <span className={styles.bannerEmoji}>🎉</span>
        <p className={styles.bannerTitle}>Audience voting is closed</p>
        <p className={styles.bannerSub}>Results are out!</p>
      </div>

      <CategorySection
        title="Solo"
        entries={[
          { entry: winners.solo.winner, label: 'Winner', medal: MEDALS[0] },
          { entry: winners.solo.runnerUp, label: 'Runner Up', medal: MEDALS[1] },
          { entry: winners.solo.secondRunnerUp, label: '2nd Runner Up', medal: MEDALS[2] },
        ]}
      />

      <CategorySection
        title="Duo / Trio"
        entries={[
          { entry: winners.duoTrio.winner, label: 'Winner', medal: MEDALS[0] },
          { entry: winners.duoTrio.runnerUp, label: 'Runner Up', medal: MEDALS[1] },
          { entry: winners.duoTrio.secondRunnerUp, label: '2nd Runner Up', medal: MEDALS[2] },
        ]}
      />

      <CategorySection
        title="Special Awards"
        entries={[
          { entry: winners.bestEntertainer, label: 'Best Entertainer', medal: '🌟' },
          { entry: winners.studentOfTheYear, label: 'Student of the Year', medal: '🏆' },
        ]}
      />
    </div>
  );
}
