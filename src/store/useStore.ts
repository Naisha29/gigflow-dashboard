import { create } from 'zustand';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
};

interface AppState {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  updateLeadStatus: (id: string, status: string) => void;
  addLead: (lead: Lead) => void;
  removeLead: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
  updateLeadStatus: (id, status) => set((state) => ({
    leads: state.leads.map((lead) => lead.id === id ? { ...lead, status } : lead)
  })),
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  removeLead: (id) => set((state) => ({
    leads: state.leads.filter((lead) => lead.id !== id)
  }))
}));
