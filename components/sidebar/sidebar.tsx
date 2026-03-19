"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.scss";
import { getActiveLabel } from "./sidebar-utils";
import LogoutButton from "./logout-button";

interface NavItem {
  label: string;
  icon: string;
  path?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Customers",
    items: [
      {
        label: "Users",
        path: "/dashboard/users",
        icon: "/icons/user-friends.svg",
      },
      { label: "Guarantors", icon: "/icons/users.svg" },
      { label: "Loans", icon: "/icons/sack.svg" },
      { label: "Decision Models", icon: "/icons/handshake-regular.svg" },
      { label: "Savings", icon: "/icons/piggy-bank.svg" },
      { label: "Loan Requests", icon: "/icons/load-request.svg" },
      { label: "Whitelist", icon: "/icons/white-list.svg" },
      { label: "Karma", icon: "/icons/karma.svg" },
    ],
  },
  {
    title: "Businesses",
    items: [
      { label: "Organization", icon: "/icons/briefcase.svg" },
      { label: "Loan Products", icon: "/icons/load-request.svg" },
      { label: "Savings Products", icon: "/icons/saving-product.svg" },
      { label: "Fees and Charges", icon: "/icons/fee-charge.svg" },
      { label: "Transactions", icon: "/icons/transaction.svg" },
      { label: "Services", icon: "/icons/service.svg" },
      { label: "Service Account", icon: "/icons/service-account.svg" },
      { label: "Settlements", icon: "/icons/settlement.svg" },
      { label: "Reports", icon: "/icons/reports.svg" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Preferences", icon: "/icons/preference.svg" },
      { label: "Fees and Pricing", icon: "/icons/fee-pricing.svg" },
      { label: "Audit Logs", icon: "/icons/audit-logs.svg" },
      { label: "Systems Messages", icon: "/icons/system-message.svg" },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeItem = getActiveLabel(pathname);

  return (
    <>
      <div
        className={`${styles.sidebarOverlay} ${isOpen ? styles.visible : ""}`}
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.switchOrgWrapper}>
            <span className={styles.switchOrgIcon}>
              <img src={"/icons/briefcase.svg"} />
            </span>
            <select className={styles.switchOrg} defaultValue="">
              <option value="" disabled>
                Switch Organization
              </option>
              <option value="lendsqr">Lendsqr</option>
              <option value="irorun">Irorun</option>
              <option value="angala">Angala</option>
            </select>
            <span className={styles.switchOrgArrow}>
              <img src={"/icons/caret-down.svg"} />
            </span>
          </div>

          <nav className={styles.nav}>
            <div
              className={`${styles.navItem} ${activeItem === "Dashboard" ? styles.active : ""}`}
              onClick={() => router.push("/dashboard")}
            >
              <span className={styles.icon}>
                <img src={"/icons/home.svg"} />
              </span>
              <span>Dashboard</span>
            </div>

            {navigation.map((group) => (
              <div key={group.title} className={styles.navGroup}>
                <div className={styles.groupTitle}>{group.title}</div>
                <div className={styles.groupItems}>
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className={`${styles.navItem} ${activeItem === item.label ? styles.active : ""}`}
                      onClick={() => {
                        if (item.path) {
                          router.push(item.path);
                        }
                        onClose?.();
                      }}
                    >
                      <span className={styles.icon}>
                        <img src={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className={styles.sidebarBottom}>
            <div className={styles.bottomDivider} />

            <LogoutButton />

            <p className={styles.version}>v1.2.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
