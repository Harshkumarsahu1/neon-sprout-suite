const BASE_URL = process.env.OPENMIC_BASE_URL || 'https://api.openmic.ai';
const API_KEY = process.env.OPENMIC_API_KEY || '';

export async function startCall({ botUid, to, metadata = {} }) {
  if (!API_KEY) throw new Error('OPENMIC_API_KEY is not set');
  if (!botUid) throw new Error('botUid is required to start a call');
  if (!to) throw new Error('destination phone number (to) is required');

  // NOTE: Endpoint path/shape may differ; adjust per official docs.
  const url = `${BASE_URL}/v1/calls`;
  const body = {
    bot_uid: botUid,
    to,
    // Optional: include webhook overrides or metadata if supported
    metadata,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`OpenMic startCall failed: ${res.status} ${text}`);
  }

  return res.json();
}

// --- OpenMic Bots CRUD (proxy helpers) ---
export async function omListBots() {
  if (!API_KEY) throw new Error('OPENMIC_API_KEY is not set');
  const url = `${BASE_URL}/v1/bots`;
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
  if (!res.ok) throw new Error(`OpenMic list bots failed: ${res.status}`);
  return res.json();
}

export async function omCreateBot(payload) {
  if (!API_KEY) throw new Error('OPENMIC_API_KEY is not set');
  const url = `${BASE_URL}/v1/bots`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`OpenMic create bot failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function omUpdateBot(botUid, patch) {
  if (!API_KEY) throw new Error('OPENMIC_API_KEY is not set');
  const url = `${BASE_URL}/v1/bots/${encodeURIComponent(botUid)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`OpenMic update bot failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function omDeleteBot(botUid) {
  if (!API_KEY) throw new Error('OPENMIC_API_KEY is not set');
  const url = `${BASE_URL}/v1/bots/${encodeURIComponent(botUid)}`;
  const res = await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${API_KEY}` } });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`OpenMic delete bot failed: ${res.status} ${text}`);
  }
  return res.json().catch(() => ({ ok: true }));
}
