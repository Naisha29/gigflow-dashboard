"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // A quick way to seed the DB on first run
  const handleSeed = async () => {
    setSeeding(true);
    await fetch("/api/seed");
    setSeeding(false);
    alert("Database seeded! You can now log out and log in with admin@gigflow.com / password123");
  };

  if (status === "loading") {
    return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Smart Leads Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your hiring pipeline efficiently.</p>
          </div>
          <button onClick={handleSeed} className="btn btn-secondary" disabled={seeding}>
            {seeding ? "Seeding..." : "Seed Database"}
          </button>
        </div>
        
        <KanbanBoard />
      </main>
    </div>
  );
}
