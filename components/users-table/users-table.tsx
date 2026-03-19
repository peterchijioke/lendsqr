"use client";

import { Fragment, useRef, useState, useMemo } from "react";
import styles from "./users-table.module.scss";
import Table from "@/components/table";
import MoreMenu from "@/components/more-menu/more-menu";
import FilterDropdown from "@/components/filter-dropdown/filter-dropdown";
import Pagination from "@/components/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Organization } from "@/app/dashboard/users/page";

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

interface FilterForm {
  organization: string;
  name: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}

const emptyFilter: FilterForm = {
  organization: "",
  name: "",
  email: "",
  date: "",
  phone: "",
  status: "",
};

interface UsersTableProps {
  users: User[];
  organizations: Organization[];
  searchQuery?: string;
}

const COLUMNS = [
  { key: "organization", label: "ORGANIZATION" },
  { key: "name", label: "USERNAME" },
  { key: "email", label: "EMAIL" },
  { key: "phone", label: "PHONE NUMBER" },
  { key: "dateJoined", label: "DATE JOINED" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "" },
];

export default function UsersTable({ users, organizations, searchQuery: initialSearchQuery = "" }: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || initialSearchQuery;
  const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterForm>(emptyFilter);
  const [openMoreIdx, setOpenMoreIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const buttonRefs = useRef<Record<number, HTMLButtonElement>>({});
  const filterBtnRefs = useRef<Record<string, HTMLButtonElement>>({});

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          u.name.toLowerCase().includes(query) ||
          u.firstName?.toLowerCase().includes(query) ||
          u.lastName?.toLowerCase().includes(query) ||
          u.personal?.emailAddress?.toLowerCase().includes(query) ||
          u.personal?.phoneNumber?.includes(query) ||
          u.accountNumber?.includes(query);
        if (!matchesSearch) return false;
      }

      if (
        activeFilter.organization &&
        u.organization.toLowerCase() !== activeFilter.organization.toLowerCase()
      )
        return false;
      if (
        activeFilter.name &&
        !u.name.toLowerCase().includes(activeFilter.name.toLowerCase())
      )
        return false;
      if (
        activeFilter.status &&
        u.status.toLowerCase() !== activeFilter.status.toLowerCase()
      )
        return false;
      return true;
    });
  }, [users, activeFilter, searchQuery]);

  const totalItems = filteredUsers.length;
  const startIndex = (currentPage - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + perPage);

  const getStatusBadgeClass = (status: User["status"]): string => {
    const statusClasses: Record<User["status"], string> = {
      active: styles["badge--Active"] || "",
      inactive: styles["badge--Inactive"] || "",
      pending: styles["badge--Pending"] || "",
      blacklisted: styles["badge--Blacklisted"] || "",
    };
    return statusClasses[status];
  };

  const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Fragment>
      <div className={styles.tableContainer}>
        <Table
          columns={COLUMNS}
          data={paginatedUsers}
          showFilterRow={openFilterColumn !== null}
          showCard={false}
          filterRowContent={
            openFilterColumn !== null ? (
              <FilterDropdown
                organizations={organizations}
                anchorEl={filterBtnRefs.current[openFilterColumn] ?? null}
                onClose={() => setOpenFilterColumn(null)}
                onFilter={(f) => setActiveFilter(f as FilterForm)}
              />
            ) : undefined
          }
          renderCell={(row, column) => {
            const user = row as unknown as User;
            const idx = paginatedUsers.indexOf(user);

            if (column.key === "status") {
              return (
                <span
                  className={`${styles.badge} ${getStatusBadgeClass(user.status)}`}
                >
                  {formatStatus(user.status)}
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
                      onViewDetails={(userId) =>
                        router.push(`/dashboard/users/${userId}`)
                      }
                    />
                  )}
                </div>
              );
            }

            if (column.key === "name") return user.name;
            if (column.key === "organization") return user.organization;
            if (column.key === "dateJoined") return user.dateJoined;
            if (column.key === "email")
              return user.personal?.emailAddress || "";
            if (column.key === "phone") return user.personal?.phoneNumber || "";

            return String(user[column.key as keyof User] ?? "");
          }}
          renderHeaderCell={(column) => {
            if (column.key === "actions") return null;
            return (
              <button
                ref={(el) => {
                  if (el && column.key === "organization")
                    filterBtnRefs.current[column.key] = el;
                }}
                type="button"
                className={styles.filterIcon}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (column.key === "organization") {
                    setOpenFilterColumn((v) =>
                      v === column.key ? null : column.key,
                    );
                  }
                }}
              >
                <img src="/icons/filter-results-button.svg" alt="filter" />
              </button>
            );
          }}
        />
      </div>

      <Pagination
        totalItems={totalItems}
        initialPage={currentPage}
        initialPerPage={perPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setOpenMoreIdx(null);
        }}
        onPerPageChange={(perPageValue) => {
          setPerPage(perPageValue);
          setCurrentPage(1);
          setOpenMoreIdx(null);
        }}
      />
    </Fragment>
  );
}
