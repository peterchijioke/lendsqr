"use client";

import styles from "./detail-card.module.scss";

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

interface DetailCardProps {
  personal: PersonalInfo;
  employment: Employment;
  socials: Socials;
  guarantors: Guarantor[];
}

export default function DetailCard({
  personal,
  employment,
  socials,
  guarantors,
}: DetailCardProps) {
  return (
    <div className={styles.detailCard}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.grid5}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Full Name</span>
            <span className={styles.fieldValue}>{personal.fullName}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Phone Number</span>
            <span className={styles.fieldValue}>{personal.phone}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Email Address</span>
            <span className={styles.fieldValue}>{personal.email}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>BVN</span>
            <span className={styles.fieldValue}>{personal.bvn}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Gender</span>
            <span className={styles.fieldValue}>{personal.gender}</span>
          </div>
        </div>
        <div className={styles.grid5}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Marital Status</span>
            <span className={styles.fieldValue}>{personal.maritalStatus}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Children</span>
            <span className={styles.fieldValue}>{personal.children}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Type of Residence</span>
            <span className={styles.fieldValue}>{personal.residenceType}</span>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Education and Employment</h3>
        <div className={styles.grid5}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Level of Education</span>
            <span className={styles.fieldValue}>{employment.education}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Employment Status</span>
            <span className={styles.fieldValue}>{employment.status}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Sector of Employment</span>
            <span className={styles.fieldValue}>{employment.sector}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Duration of Employment</span>
            <span className={styles.fieldValue}>{employment.duration}</span>
          </div>
        </div>
        <div className={styles.grid5}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Office Email</span>
            <span className={styles.fieldValue}>{employment.officeEmail}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Monthly Income</span>
            <span className={styles.fieldValue}>{employment.monthlyIncome}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Loan Repayment</span>
            <span className={styles.fieldValue}>{employment.loanRepayment}</span>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Socials</h3>
        <div className={styles.grid5}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Twitter</span>
            <span className={styles.fieldValue}>{socials.twitter}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Facebook</span>
            <span className={styles.fieldValue}>{socials.facebook}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Instagram</span>
            <span className={styles.fieldValue}>{socials.instagram}</span>
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Guarantor</h3>
        {guarantors.map((g, index) => (
          <div key={index}>
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
            {index < guarantors.length - 1 && <div className={styles.guarantorDivider} />}
          </div>
        ))}
      </section>
    </div>
  );
}
