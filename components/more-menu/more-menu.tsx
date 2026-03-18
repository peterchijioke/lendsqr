"use client";

import { useRef, useEffect } from "react";
import styles from "./more-menu.module.scss";

interface MoreMenuProps {
  onClose: () => void;
}

export default function MoreMenu({ onClose }: MoreMenuProps) {
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
        <img src="/icons/eye.svg" alt="" />
        View Details
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/user-x.svg" alt="" />
        Blacklist User
      </button>
      <button className={styles.moreMenuItem}>
        <img src="/icons/user-tick.svg" alt="" />
        Activate User
      </button>
    </div>
  );
}
