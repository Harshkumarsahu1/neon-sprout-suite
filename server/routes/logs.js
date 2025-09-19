import express from 'express';
import CallLog from '../models/CallLog.js';

const router = express.Router();

// List logs with optional filters
router.get('/', async (req, res) => {
  try {
    const { botUid, sessionId, limit = 100 } = req.query;
    const q = {};
    if (botUid) q.botUid = botUid;
    if (sessionId) q.sessionId = sessionId;

    const logs = await CallLog.find(q)
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 100, 500));

    res.json(logs);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

export default router;
