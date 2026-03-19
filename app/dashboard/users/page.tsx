import { userService } from "@/services/userService";
import styles from "./users.module.scss";
import UsersTable from "@/components/users-table";

interface Personal {
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  relationship: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  organization: string;
  tier: number;
  balance: string;
  accountNumber: string;
  bankName: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  dateJoined: string;
  avatar: null | string;
  personal: Personal;
  guarantors: Guarantor[];
}

export interface UsersResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Organization {
  id: number;
  name: string;
}

export const metadata = {
  title: "Users | Lendsqr",
  description: "Manage and view all users in the Lendsqr platform",
};

const STATS = [
  {
    label: "USERS",
    value: "2,453",
    icon: "/icons/users-dashboad.svg",
    variant: "pink",
    transform: "",
  },
  {
    label: "ACTIVE USERS",
    value: "2,453",
    icon: "/icons/active-users.svg",
    variant: "purple",
    transform: "percentage",
  },
  {
    label: "USERS WITH LOANS",
    value: "12,453",
    icon: "/icons/users-with-loan.svg",
    variant: "orange",
    transform: "currency",
  },
  {
    label: "USERS WITH SAVINGS",
    value: "102,453",
    icon: "/icons/users-with-savings.svg",
    variant: "red",
    transform: "compact",
  },
];



export interface Organization {
  id: number;
  name: string;
}

export interface OrganizationsResponse {
  data: Organization[];
}



function transformValue(value: string, transform?: string): string {
  switch (transform) {
    case "percentage":
      return `${value}%`;
    case "currency":
      return `${value}`;
    case "compact":
      const num = parseFloat(value.replace(/,/g, ""));
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return value;
    default:
      return value;
  }
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || "";
  const users = await userService.getUsers();
  const organizations = await userService.getOrganizations();
  const apiStats = await userService.getDashboardStats();
  
  // Merge API stats with STATS to get icon, variant, and transform
  const dashboardState = apiStats.length > 0 
    ? apiStats.map((stat, index) => ({
        ...stat,
        icon: STATS[index]?.icon || "",
        variant: STATS[index]?.variant || "pink",
        transform: STATS[index]?.transform || "",
      }))
    : STATS;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.statsGrid}>
        {dashboardState.map(({ label, value, icon, transform }) => (
          <div key={label} className={styles.statCard}>
            <img src={icon} alt={label} />
            <p className={styles.statLabel}>{label}</p>
            <p className={styles.statValue}>{transformValue(value, transform)}</p>
          </div>
        ))}
      </div>

      <UsersTable organizations={organizations} users={users} searchQuery={searchQuery} />
    </div>
  );
}
