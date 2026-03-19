"use client";

import { useState, useEffect } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authService, LoginUser } from "../../services/authService";

interface HeaderProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  onSearch?: (query: string) => void;
}

export default function Header({ onMenuClick, isSidebarOpen, onSearch }: HeaderProps) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
  }, []);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const handleHamburgerClick = () => {
    onMenuClick?.();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logo}>
          <img src="/logo.svg" />
        </a>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <span>
              <img src={"/icons/search.svg"} />
            </span>
          </button>
        </form>
      </div>

      <div className={styles.actions}>
        <Link href="/docs" className={styles.docsLink}>
          Docs
        </Link>
        <button className={styles.notificationBtn}>
          <span>
            <img src={"/icons/bell.svg"} />
          </span>
        </button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <img src="/profile.png" alt="User" />
          </div>
          <span className={styles.userName}>
            {user ? `${user.firstName} ${user.lastName}` : "User"}
          </span>
          <span className={styles.dropdownArrow}>
            <img src={"/icons/down-sh.svg"} />
          </span>
        </div>
      </div>

      <div className={styles.mobileActions}>
        <div 
          className={styles.mobileUserProfile}
          onClick={() => setShowMobileDropdown(!showMobileDropdown)}
        >
          <div className={styles.avatar}>
            <img src="/profile.png" alt="User" />
          </div>
          <span className={styles.dropdownArrow}>
            <img src={"/icons/down-sh.svg"} />
          </span>
        </div>
      </div>

      {showMobileDropdown && (
        <div className={styles.mobileDropdown}>
          <div className={styles.dropdownSearch}>
            <input
              type="text"
              className={styles.dropdownSearchInput}
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={styles.dropdownSearchBtn}>
              <img src={"/icons/search.svg"} alt="Search" />
            </button>
          </div>
          <Link 
            href="/docs" 
            className={styles.dropdownItem}
            onClick={() => setShowMobileDropdown(false)}
          >
            <img src={"/file.svg"} alt="Docs" />
            <span>Docs</span>
          </Link>
          <div className={styles.dropdownUserProfile}>
            <div className={styles.avatar}>
              <img src="/profile.png" alt="User" />
            </div>
            <div className={styles.dropdownUserInfo}>
              <span className={styles.dropdownUserName}>
                {user ? `${user.firstName} ${user.lastName}` : "User"}
              </span>
            </div>
          </div>
        </div>
      )}

      <button 
        className={`${styles.hamburger} ${isSidebarOpen ? styles.open : ''}`}
        onClick={handleHamburgerClick}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
