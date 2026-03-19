"use client";

import React, { useState } from "react";
import styles from "./userDetails.module.scss";
import Link from "next/link";

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Details" },
    { id: "documents", label: "Documents" },
    { id: "bank", label: "Bank Details" },
    { id: "loans", label: "Loans" },
    { id: "savings", label: "Savings" },
    { id: "app", label: "App and System" },
  ];

  const user = {
    name: "Grace Effiom",
    id: "LSQFf587g90",
    tier: 2,
    balance: "₦200,000.00",
    account: "9912345678/Providus Bank",
    personal: {
      fullName: "Grace Effiom",
      phone: "07060780922",
      email: "grace@gmail.com",
      bvn: "07060780922",
      gender: "Female",
      maritalStatus: "Single",
      children: "None",
      residenceType: "Parent's Apartment",
    },
    employment: {
      education: "B.Sc",
      status: "Employed",
      sector: "FinTech",
      duration: "2 years",
      officeEmail: "grace@lendsqr.com",
      monthlyIncome: "₦200,000.00– ₦400,000.00",
      loanRepayment: "40,000",
    },
    socials: {
      twitter: "@grace_effiom",
      facebook: "Grace Effiom",
      instagram: "@grace_effiom",
    },
    guarantors: [
      {
        fullName: "Debby Ogana",
        phone: "07060780922",
        email: "debby@gmail.com",
        relationship: "Sister",
      },
      {
        fullName: "Debby Ogana",
        phone: "07060780922",
        email: "debby@gmail.com",
        relationship: "Sister",
      },
    ],
  };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={i < tier ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <div className={styles.page}>
      <Link href="/dashboard/users" className={styles.backBtn}>
        <img src={"/icons/arrow.svg"} />
        Back to Users
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Details</h1>
        <div className={styles.actionButtons}>
          <button className={styles.btnBlacklist}>Blacklist User</button>
          <button className={styles.btnActivate}>Activate User</button>
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileIdentity}>
            <div className={styles.avatar}>
              <img src={"/icons/user.svg"} />
            </div>
            <div>
              <h2 className={styles.profileName}>{user.name}</h2>
              <span className={styles.profileId}>{user.id}</span>
            </div>
          </div>

          <div className={styles.profileDivider} />

          <div className={styles.profileTier}>
            <p className={styles.tierLabel}>User's Tier</p>
            <div className={styles.stars}>{renderStars(user.tier)}</div>
          </div>

          <div className={styles.profileDivider} />

          <div className={styles.profileBalance}>
            <p className={styles.balanceAmount}>{user.balance}</p>
            <p className={styles.balanceAccount}>{user.account}</p>
          </div>
        </div>

        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "general" && (
        <div className={styles.detailCard}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.grid5}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Full Name</span>
                <span className={styles.fieldValue}>
                  {user.personal.fullName}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Phone Number</span>
                <span className={styles.fieldValue}>{user.personal.phone}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Email Address</span>
                <span className={styles.fieldValue}>{user.personal.email}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>BVN</span>
                <span className={styles.fieldValue}>{user.personal.bvn}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Gender</span>
                <span className={styles.fieldValue}>
                  {user.personal.gender}
                </span>
              </div>
            </div>
            <div className={styles.grid5}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Marital Status</span>
                <span className={styles.fieldValue}>
                  {user.personal.maritalStatus}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Children</span>
                <span className={styles.fieldValue}>
                  {user.personal.children}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Type of Residence</span>
                <span className={styles.fieldValue}>
                  {user.personal.residenceType}
                </span>
              </div>
            </div>
          </section>

          <div className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Education and Employment</h3>
            <div className={styles.grid5}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Level of Education</span>
                <span className={styles.fieldValue}>
                  {user.employment.education}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Employment Status</span>
                <span className={styles.fieldValue}>
                  {user.employment.status}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Sector of Employment</span>
                <span className={styles.fieldValue}>
                  {user.employment.sector}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  Duration of Employment
                </span>
                <span className={styles.fieldValue}>
                  {user.employment.duration}
                </span>
              </div>
            </div>
            <div className={styles.grid5}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Office Email</span>
                <span className={styles.fieldValue}>
                  {user.employment.officeEmail}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Monthly Income</span>
                <span className={styles.fieldValue}>
                  {user.employment.monthlyIncome}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Loan Repayment</span>
                <span className={styles.fieldValue}>
                  {user.employment.loanRepayment}
                </span>
              </div>
            </div>
          </section>

          <div className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Socials</h3>
            <div className={styles.grid5}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Twitter</span>
                <span className={styles.fieldValue}>
                  {user.socials.twitter}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Facebook</span>
                <span className={styles.fieldValue}>
                  {user.socials.facebook}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Instagram</span>
                <span className={styles.fieldValue}>
                  {user.socials.instagram}
                </span>
              </div>
            </div>
          </section>

          <div className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Guarantor</h3>
            {user.guarantors.map((g, index) => (
              <React.Fragment key={index}>
                <div className={styles.grid5}>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Full Name</span>
                    <span className={styles.fieldValue}>{g.fullName}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Phone Number</span>
                    <span className={styles.fieldValue}>{g.phone}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Email Address</span>
                    <span className={styles.fieldValue}>{g.email}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Relationship</span>
                    <span className={styles.fieldValue}>{g.relationship}</span>
                  </div>
                </div>
                {index < user.guarantors.length - 1 && (
                  <div className={styles.guarantorDivider} />
                )}
              </React.Fragment>
            ))}
          </section>
        </div>
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
};

export default UserDetails;
