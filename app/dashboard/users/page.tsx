import styles from "./users.module.scss";
import UsersTable from "@/components/users-table";

interface User {
  id: string;
  org: string;
  username: string;
  email: string;
  phone: string;
  joined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

export const metadata = {
  title: "Users | Lendsqr",
  description: "Manage and view all users in the Lendsqr platform",
};


const USERS: User[] = [
  {
    id: "1",
    org: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phone: "08078903721",
    joined: "May 15, 2020 10:00 AM",
    status: "Inactive",
  },
  {
    id: "2",
    org: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phone: "08160780928",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Pending",
  },
  {
    id: "3",
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted",
  },
  {
    id: "4",
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "07003309226",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Pending",
  },
  {
    id: "5",
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Active",
  },
  {
    id: "6",
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "08060780900",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Active",
  },
  {
    id: "7",
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted",
  },
  {
    id: "8",
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "08060780900",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Inactive",
  },
  {
    id: "9",
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Inactive",
  },
];

const STATS = [
  {
    label: "USERS",
    value: "2,453",
    icon: "/icons/users-dashboad.svg",
    variant: "pink",
  },
  {
    label: "ACTIVE USERS",
    value: "2,453",
    icon: "/icons/active-users.svg",
    variant: "purple",
  },
  {
    label: "USERS WITH LOANS",
    value: "12,453",
    icon: "/icons/users-with-loan.svg",
    variant: "orange",
  },
  {
    label: "USERS WITH SAVINGS",
    value: "102,453",
    icon: "/icons/users-with-savings.svg",
    variant: "red",
  },
];

export default async function UsersPage() {

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.statsGrid}>
        {STATS.map(({ label, value, icon }) => (
          <div key={label} className={styles.statCard}>
            <img src={icon} alt={label} />
            <p className={styles.statLabel}>{label}</p>
            <p className={styles.statValue}>{value}</p>
          </div>
        ))}
      </div>

      <UsersTable users={USERS} />
    </div>
  );
}
