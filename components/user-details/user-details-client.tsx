"use client";

import { useState } from "react";
import styles from "./user-details.module.scss";
import ProfileCard from "./profile-card";
import DetailCard from "./detail-card";

interface PersonalInfo {
  fullName: string;
  phone: string;
  email: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
}

interface Employment {
  education: string;
  status: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

interface Guarantor {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
}

interface UserData {
  name: string;
  id: string;
  tier: number;
  balance: string;
  account: string;
  personal: PersonalInfo;
  employment: Employment;
  socials: Socials;
  guarantors: Guarantor[];
}

interface UserDetailsClientProps {
  user: UserData;
}

const tabs = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];

export default function UserDetailsClient({ user }: UserDetailsClientProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className={styles.page}>
      <a href="/dashboard/users" className={styles.backBtn}>
        <img src={"/icons/arrow.svg"} />
        Back to Users
      </a>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Details</h1>
        <div className={styles.actionButtons}>
          <button className={styles.btnBlacklist}>Blacklist User</button>
          <button className={styles.btnActivate}>Activate User</button>
        </div>
      </div>

      <ProfileCard
        name={user.name}
        id={user.id}
        tier={user.tier}
        balance={user.balance}
        account={user.account}
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      />

      {activeTab === "general" && (
        <DetailCard
          personal={user.personal}
          employment={user.employment}
          socials={user.socials}
          guarantors={user.guarantors}
        />
      )}

      {activeTab !== "general" && (
        <div className={styles.detailCard}>
          <div className={styles.emptyState}>
            <p>No content available for this tab.</p>
          </div>
        </div>
      )}
    </div>
  );
}
