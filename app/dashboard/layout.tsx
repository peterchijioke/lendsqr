"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/header";
import styles from "./layout.module.scss";

const HeaderWithSearch = dynamic(
  () => Promise.resolve(function HeaderWithSearchInner({ 
    isSidebarOpen, 
    onMenuClick 
  }: { 
    isSidebarOpen?: boolean; 
    onMenuClick?: () => void 
  }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = useCallback((query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.push(`/dashboard/users?${params.toString()}`);
    }, [router, searchParams]);

    return (
      <Header 
        isSidebarOpen={isSidebarOpen}
        onMenuClick={onMenuClick}
        onSearch={handleSearch}
      />
    );
  }),
  { ssr: false }
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <HeaderWithSearch 
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
