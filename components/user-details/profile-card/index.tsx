"use client";

import styles from "./profile-card.module.scss";

interface ProfileCardProps {
  name: string;
  id: string;
  tier: number;
  balance: string;
  account: string;
  activeTab: string;
  tabs: { id: string; label: string }[];
  onTabChange: (tabId: string) => void;
}

export default function ProfileCard({
  name,
  id,
  tier,
  balance,
  account,
  activeTab,
  tabs,
  onTabChange,
}: ProfileCardProps) {
  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={i < tier ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTop}>
        <div className={styles.profileIdentity}>
          <div className={styles.avatar}>
            <img src={"/icons/user.svg"} />
          </div>
          <div>
            <h2 className={styles.profileName}>{name}</h2>
            <span className={styles.profileId}>{id}</span>
          </div>
        </div>

        <div className={styles.profileDivider} />

        <div className={styles.profileTier}>
          <p className={styles.tierLabel}>User's Tier</p>
          <div className={styles.stars}>{renderStars(tier)}</div>
        </div>

        <div className={styles.profileDivider} />

        <div className={styles.profileBalance}>
          <p className={styles.balanceAmount}>{balance}</p>
          <p className={styles.balanceAccount}>{account}</p>
        </div>
      </div>

      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
