"use client";

import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header 
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
      />

      <div className={styles.dashboard}>
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        <div className={styles.mainContent}>
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </>
  );
}
