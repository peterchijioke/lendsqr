"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./more-menu.module.scss";

interface MoreMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  userId: string;
  onViewDetails: (userId: string) => void;
}

export default function MoreMenu({ anchorEl, onClose, userId, onViewDetails }: MoreMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const rect = anchorEl?.getBoundingClientRect();
  const top = rect ? rect.bottom + window.scrollY + 4 : 0;
  const left = rect ? rect.right + window.scrollX - 160 : 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        e.target !== anchorEl
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorEl]);

  const menu = (
    <div ref={menuRef} className={styles.moreMenu} style={{ top, left }}>
      <button
        className={styles.moreMenuItem}
        onClick={() => onViewDetails(userId)}
      >
        <img src="/icons/eye.svg" alt="" /> View Details
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/user-x.svg" alt="" /> Blacklist User
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/user-tick.svg" alt="" /> Activate User
      </button>
    </div>
  );

  return createPortal(menu, document.body);
}
