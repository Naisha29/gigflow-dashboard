"use client";

import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, Users, Settings, LogOut, PlusCircle } from "lucide-react";
import { useState } from "react";
import AddLeadModal from "./AddLeadModal";

export default function Sidebar() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
          GF
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>GigFlow</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginTop: '1rem' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', background: 'var(--primary)', color: 'white' }}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </a>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', color: 'var(--text-muted)' }}>
          <Users size={18} />
          <span>Team</span>
        </a>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius)', color: 'var(--text-muted)' }}>
          <Settings size={18} />
          <span>Settings</span>
        </a>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} />
          Add Lead
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius)' }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{session?.user?.name || "Admin"}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {session?.user?.email}
            </div>
          </div>
          <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {isModalOpen && <AddLeadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
