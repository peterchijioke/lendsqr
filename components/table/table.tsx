"use client";

import React from "react";
import styles from "./table.module.scss";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn[];
  data: T[];
  renderCell?: (row: T, column: TableColumn) => React.ReactNode;
  renderHeaderCell?: (column: TableColumn) => React.ReactNode;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  showFilterRow?: boolean;
  filterRowContent?: React.ReactNode;
  showCard?: boolean;
}

export default function Table<T>({
  columns,
  data,
  renderCell,
  renderHeaderCell,
  onRowClick,
  emptyMessage = "No data available",
  showFilterRow = false,
  filterRowContent,
  showCard = true,
}: TableProps<T>) {
  const cardClass = showCard ? styles.tableCard : styles.tableCardPlain;

  return (
    <div className={cardClass}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.th}>
                  <span className={styles.thInner}>
                    {col.label}
                    {renderHeaderCell ? renderHeaderCell(col) : null}
                  </span>
                </th>
              ))}
            </tr>
            {showFilterRow && filterRowContent && (
              <tr>
                <td className={styles.filterTd} colSpan={columns.length}>
                  {filterRowContent}
                </td>
              </tr>
            )}
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  className={styles.emptyTd}
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${styles.tr} ${onRowClick ? styles.clickable : ""}`}
                  onClick={() => onRowClick?.(row)}
                  style={{ animationDelay: `${rowIndex * 0.05}s` }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      {renderCell 
                        ? renderCell(row, col) 
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
