"use client";

import { useStore, Lead } from "@/store/useStore";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const STAGES = ["New", "Contacted", "Interviewing", "Hired", "Rejected"];

export default function KanbanBoard() {
  const { leads, setLeads, updateLeadStatus, removeLead } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leads", err);
        setLoading(false);
      });
  }, [setLeads]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("leadId", id);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    
    // Optimistic update
    updateLeadStatus(leadId, newStatus);
    
    // Server update
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    // Optimistic delete
    removeLead(id);

    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading leads...</div>;
  }

  return (
    <div className="kanban-board">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.status === stage);
        return (
          <div
            key={stage}
            className="kanban-column glass"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <div className="kanban-column-header">
              <span>{stage}</span>
              <span style={{ fontSize: '0.875rem', background: 'var(--surface-border)', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>
                {stageLeads.length}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="lead-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="lead-name">{lead.name}</div>
                    <button 
                      onClick={() => handleDelete(lead.id)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
                      title="Delete Lead"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="lead-email">{lead.email}</div>
                  {lead.phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{lead.phone}</div>}
                  {lead.notes && (
                    <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', padding: '0.5rem', background: 'var(--background)', borderRadius: '0.25rem' }}>
                      {lead.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
