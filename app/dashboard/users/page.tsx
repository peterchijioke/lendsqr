"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./users.module.scss";

const USERS = [
  {
    org: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phone: "08078903721",
    joined: "May 15, 2020 10:00 AM",
    status: "Inactive",
  },
  {
    org: "Irorun",
    username: "Debby Ogana",
    email: "debby2@irorun.com",
    phone: "08160780928",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Pending",
  },
  {
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted",
  },
  {
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "07003309226",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Pending",
  },
  {
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Active",
  },
  {
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "08060780900",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Active",
  },
  {
    org: "Lendstar",
    username: "Grace Effiom",
    email: "grace@lendstar.com",
    phone: "07060780922",
    joined: "Apr 30, 2020 10:00 AM",
    status: "Blacklisted",
  },
  {
    org: "Lendsqr",
    username: "Tosin Dokunmu",
    email: "tosin@lendsqr.com",
    phone: "08060780900",
    joined: "Apr 10, 2020 10:00 AM",
    status: "Inactive",
  },
  {
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

const COLUMNS = [
  "ORGANIZATION",
  "USERNAME",
  "EMAIL",
  "PHONE NUMBER",
  "DATE JOINED",
  "STATUS",
];

interface FilterForm {
  org: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}
const emptyFilter: FilterForm = {
  org: "",
  username: "",
  email: "",
  date: "",
  phone: "",
  status: "",
};

function FilterDropdown({
  onClose,
  onFilter,
}: {
  onClose: () => void;
  onFilter: (f: FilterForm) => void;
}) {
  const [form, setForm] = useState<FilterForm>(emptyFilter);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const set =
    (key: keyof FilterForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div ref={ref} className={styles.filterDropdown}>
      <div className={styles.filterField}>
        <label>Organization</label>
        <select value={form.org} onChange={set("org")}>
          <option value="">Select</option>
          <option value="Lendsqr">Lendsqr</option>
          <option value="Irorun">Irorun</option>
          <option value="Lendstar">Lendstar</option>
        </select>
      </div>
      <div className={styles.filterField}>
        <label>Username</label>
        <input
          placeholder="User"
          value={form.username}
          onChange={set("username")}
        />
      </div>
      <div className={styles.filterField}>
        <label>Email</label>
        <input placeholder="Email" value={form.email} onChange={set("email")} />
      </div>
      <div className={styles.filterField}>
        <label>Date</label>
        <input type="date" value={form.date} onChange={set("date")} />
      </div>
      <div className={styles.filterField}>
        <label>Phone Number</label>
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={set("phone")}
        />
      </div>
      <div className={styles.filterField}>
        <label>Status</label>
        <select value={form.status} onChange={set("status")}>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className={styles.filterActions}>
        <button
          className={styles.resetBtn}
          onClick={() => setForm(emptyFilter)}
        >
          Reset
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => {
            onFilter(form);
            onClose();
          }}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

function MoreMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.moreMenu}>
      <button className={styles.moreMenuItem}>
        <img src="/icons/view.svg" alt="" />
        View Details
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/blacklist.svg" alt="" />
        Blacklist User
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/activate.svg" alt="" />
        Activate User
      </button>
    </div>
  );
}

export default function UsersPage() {
  const [perPage, setPerPage] = useState(100);
  const [page, setPage] = useState(1);
  const totalPages = 16;
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterForm>(emptyFilter);
  const [openMoreIdx, setOpenMoreIdx] = useState<number | null>(null);

  const filteredUsers = USERS.filter((u) => {
    if (activeFilter.org && u.org !== activeFilter.org) return false;
    if (
      activeFilter.username &&
      !u.username.toLowerCase().includes(activeFilter.username.toLowerCase())
    )
      return false;
    if (
      activeFilter.email &&
      !u.email.toLowerCase().includes(activeFilter.email.toLowerCase())
    )
      return false;
    if (activeFilter.phone && !u.phone.includes(activeFilter.phone))
      return false;
    if (activeFilter.status && u.status !== activeFilter.status) return false;
    return true;
  });

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

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {COLUMNS.map((col, colIdx) => (
                  <th key={col} className={styles.th}>
                    <span className={styles.thInner}>
                      {col}
                      <div className={styles.filterIconWrap}>
                        <div
                          className={styles.filterIcon}
                          onClick={() =>
                            colIdx === 0 && setFilterOpen((v) => !v)
                          }
                        >
                          <img
                            src="/icons/filter-results-button.svg"
                            alt="filter"
                          />
                        </div>
                        {colIdx === 0 && filterOpen && (
                          <FilterDropdown
                            onClose={() => setFilterOpen(false)}
                            onFilter={(f) => setActiveFilter(f)}
                          />
                        )}
                      </div>
                    </span>
                  </th>
                ))}
                <th className={styles.th} />
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{user.org}</td>
                  <td className={styles.td}>{user.username}</td>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.phone}</td>
                  <td className={styles.td}>{user.joined}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${styles[`badge--${user.status}`]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.tdMore}`}>
                    <div className={styles.moreBtnWrap}>
                      <button
                        className={styles.moreBtn}
                        onClick={() =>
                          setOpenMoreIdx(openMoreIdx === i ? null : i)
                        }
                      >
                        <img src="/icons/more.svg" alt="more" />
                      </button>
                      {openMoreIdx === i && (
                        <MoreMenu onClose={() => setOpenMoreIdx(null)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.perPage}>
            <span>Showing</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className={styles.perPageSelect}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>out of 100</span>
          </div>
          <div className={styles.pages}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <img src="/icons/caret-left.svg" alt="prev" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`${styles.pageBtn} ${page === p ? styles["pageBtn--active"] : ""}`}
              >
                {p}
              </button>
            ))}
            <span className={styles.ellipsis}>...</span>
            {[15, 16].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`${styles.pageBtn} ${page === p ? styles["pageBtn--active"] : ""}`}
              >
                {p}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <img src="/icons/caret-right.svg" alt="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
