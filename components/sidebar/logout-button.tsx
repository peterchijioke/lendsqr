"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import styles from "./sidebar.module.scss";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authService.logout();
    router.push('/');
  };

  return (
    <div 
      className={styles.navItem} 
      onClick={isLoggingOut ? undefined : handleLogout}
      style={{ opacity: isLoggingOut ? 0.6 : 1, cursor: isLoggingOut ? 'wait' : 'pointer' }}
    >
      <span className={styles.icon}>
        <img src={"/icons/sign-out.svg"} />
      </span>
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </div>
  );
}
