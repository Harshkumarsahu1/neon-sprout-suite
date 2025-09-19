import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create user (e.g., on login/registration)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, metadata } = req.body || {};
    const user = await User.create({ name, email, phone, metadata });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Failed to create user' });
  }
});

// Upsert by email
router.put('/by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const patch = req.body || {};
    const user = await User.findOneAndUpdate(
      { email },
      { $set: patch },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Failed to upsert user' });
  }
});

// List users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(200);
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'Invalid user id' });
  }
});

// Patch by id
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Failed to update user' });
  }
});

// Delete by id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

export default router;
