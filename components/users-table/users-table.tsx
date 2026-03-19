"use client";

import { Fragment, useRef, useState } from "react";
import styles from "./users-table.module.scss";
import Table from "@/components/table";
import MoreMenu from "@/components/more-menu/more-menu";
import FilterDropdown from "@/components/filter-dropdown/filter-dropdown";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  org: string;
  username: string;
  email: string;
  phone: string;
  joined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

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

interface UsersTableProps {
  users: User[];
}

const COLUMNS = [
  { key: "org", label: "ORGANIZATION" },
  { key: "username", label: "USERNAME" },
  { key: "email", label: "EMAIL" },
  { key: "phone", label: "PHONE NUMBER" },
  { key: "joined", label: "DATE JOINED" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "" },
];

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterForm>(emptyFilter);
  const [openMoreIdx, setOpenMoreIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement>>({});

  const filteredUsers = users.filter((u) => {
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

  const getStatusBadgeClass = (status: User["status"]): string => {
    const statusClasses: Record<User["status"], string> = {
      Active: styles["badge--Active"] || "",
      Inactive: styles["badge--Inactive"] || "",
      Pending: styles["badge--Pending"] || "",
      Blacklisted: styles["badge--Blacklisted"] || "",
    };
    return statusClasses[status];
  };

  return (
    <Fragment>
      <div className={styles.tableContainer}>
        <Table
          columns={COLUMNS}
          data={filteredUsers}
          showFilterRow={filterOpen}
          showCard={false}
          filterRowContent={
            filterOpen ? (
              <FilterDropdown
                anchorEl={filterBtnRef.current}
                onClose={() => setFilterOpen(false)}
                onFilter={(f) => setActiveFilter(f as FilterForm)}
              />
            ) : undefined
          }
          renderCell={(row, column) => {
            const user = row as unknown as User;
            const idx = filteredUsers.indexOf(user);

            if (column.key === "status") {
              return (
                <span
                  className={`${styles.badge} ${getStatusBadgeClass(user.status)}`}
                >
                  {user.status}
                </span>
              );
            }

            if (column.key === "actions") {
              return (
                <div className={styles.tdMore}>
                  <button
                    className={styles.moreBtn}
                    ref={(el) => {
                      if (el) buttonRefs.current[idx] = el;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMoreIdx(openMoreIdx === idx ? null : idx);
                    }}
                  >
                    <img src="/icons/more.svg" alt="more" />
                  </button>
                  {openMoreIdx === idx && (
                    <MoreMenu
                      anchorEl={buttonRefs.current[idx] ?? null}
                      onClose={() => setOpenMoreIdx(null)}
                      userId={user.id}
                      onViewDetails={(userId) => router.push(`/dashboard/users/${userId}`)}
                    />
                  )}
                </div>
              );
            }

            if (column.key === "username") return user.username;
            if (column.key === "org") return user.org;

            return String(user[column.key as keyof User] ?? "");
          }}
          renderHeaderCell={(column) => {
            if (column.key === "org") {
              return (
                <button
                  ref={filterBtnRef}
                  type="button"
                  className={styles.filterIcon}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setFilterOpen((v) => !v);
                  }}
                >
                  <img src="/icons/filter-results-button.svg" alt="filter" />
                </button>
              );
            }
            return null;
          }}
        />
      </div>

      <Pagination
        totalItems={100}
        initialPage={currentPage}
        initialPerPage={perPage}
        onPageChange={setCurrentPage}
        onPerPageChange={setPerPage}
      />
    </Fragment>
  );
}
