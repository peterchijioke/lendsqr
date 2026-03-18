"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./filter-dropdown.module.scss";

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

interface FilterDropdownProps {
  onClose: () => void;
  onFilter: (f: FilterForm) => void;
}

export default function FilterDropdown({
  onClose,
  onFilter,
}: FilterDropdownProps) {
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
