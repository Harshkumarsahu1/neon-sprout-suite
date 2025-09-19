import express from 'express';
import Bot from '../models/Bot.js';
import { startCall } from '../services/openmicClient.js';

const router = express.Router();

// List bots
router.get('/', async (req, res) => {
  try {
    const bots = await Bot.find().sort({ createdAt: -1 });
    res.json(bots);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch bots' });
  }
});

// Create bot
router.post('/', async (req, res) => {
  try {
    const { name, domain, domainType, prompt, botUid, status, phone, userId } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    if (!domainType) return res.status(400).json({ error: 'domainType is required' });
    const bot = await Bot.create({ name, domain, domainType, prompt, botUid, status, phone });

    // Fire-and-forget start call if phone and botUid exist
    if (phone && botUid) {
      startCall({ botUid, to: phone, metadata: { botId: String(bot._id), userId: userId || null } })
        .catch((err) => {
          // Log the error server-side but don't fail creation
          console.error('OpenMic startCall failed', err?.message || err);
        });
    }

    res.status(201).json(bot);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Failed to create bot' });
  }
});

// Update bot
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Bot.findByIdAndUpdate(id, req.body, { new: true });
    if (!bot) return res.status(404).json({ error: 'Bot not found' });
    res.json(bot);
  } catch (e) {
    res.status(400).json({ error: 'Failed to update bot' });
  }
});

// Delete bot
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Bot.findByIdAndDelete(id);
    if (!bot) return res.status(404).json({ error: 'Bot not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete bot' });
  }
});

export default router;
