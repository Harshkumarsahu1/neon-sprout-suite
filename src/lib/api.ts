export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

// Bots
export type Bot = {
  _id: string;
  name: string;
  domain?: string;
  status: 'active' | 'inactive';
  botUid?: string; // OpenMic UID
  domainType: 'medical' | 'legal' | 'receptionist';
  prompt?: string;
  phone?: string;
  createdAt: string;
};

export type CreateBotDTO = {
  name: string;
  domain?: string;
  domainType: 'medical' | 'legal' | 'receptionist';
  prompt?: string;
  botUid?: string;
  status?: 'active' | 'inactive';
  phone?: string;
};

export const listBots = () => http<Bot[]>('/api/bots');
export const createBot = (payload: CreateBotDTO) => http<Bot>('/api/bots', { method: 'POST', body: JSON.stringify(payload) });
export const updateBot = (id: string, patch: Partial<CreateBotDTO>) => http<Bot>(`/api/bots/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
export const deleteBot = (id: string) => http<{ ok: boolean }>(`/api/bots/${id}`, { method: 'DELETE' });

// Logs
export type CallLog = {
  _id: string;
  botUid?: string;
  sessionId?: string;
  startedAt?: string;
  endedAt?: string;
  metadata?: any;
  transcript: { role: 'user' | 'agent' | 'system'; text: string; at?: string }[];
  functionCalls?: { name: string; input: any; output: any; at?: string }[];
  summary?: string;
  questions?: string[];
  createdAt: string;
};

export const listLogs = (params?: { botUid?: string; sessionId?: string; limit?: number }) => {
  const qs = new URLSearchParams();
  if (params?.botUid) qs.set('botUid', params.botUid);
  if (params?.sessionId) qs.set('sessionId', params.sessionId);
  if (params?.limit) qs.set('limit', String(params.limit));
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return http<CallLog[]>(`/api/logs${suffix}`);
};
