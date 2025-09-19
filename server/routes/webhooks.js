import express from 'express';
import CallLog from '../models/CallLog.js';
import Bot from '../models/Bot.js';

const router = express.Router();

// Convenience GET to help manual testing in a browser
router.get('/pre-call', (req, res) => {
  return res.status(405).json({
    error: 'Use POST /webhooks/pre-call with application/json',
    example: { botUid: 'YOUR_BOT_UID', caseId: 'CASE-123', phone: '+15551234567' },
  });
});

// Pre-call webhook: return example user/case data based on incoming info
router.post('/pre-call', async (req, res) => {
  try {
    const { botUid = '', phone = '', caseId = '', medicalId = '' } = req.body || {};

    // Find related bot if exists
    const bot = await Bot.findOne({ botUid });

    // Example pre-call payload (domain: legal by default)
    const payload = {
      domain: bot?.domainType || 'legal',
      botUid,
      caller: {
        phone,
        name: 'Unknown',
      },
      context: {
        // Provide example pre-fetched data (legal domain)
        client: caseId
          ? { id: caseId, name: 'Jane Smith', matter: 'Property Dispute' }
          : undefined,
        case: caseId
          ? { id: caseId, title: 'Case Intake', notes: 'Initial consultation scheduled' }
          : undefined,
        lastCallSummary: 'No prior calls logged.',
      },
    };

    return res.json(payload);
  } catch (e) {
    return res.status(500).json({ error: 'pre-call processing failed' });
  }
});

// In-call function call webhook: fetch details during active session
router.post('/function-call', async (req, res) => {
  try {
    const raw = req.body || {};
    // DEBUG LOGS: incoming function-call
    try {
      console.log('[function-call] headers:', {
        'x-openmic-bot-uid': req.headers['x-openmic-bot-uid'],
        'x-bot-uid': req.headers['x-bot-uid'],
        'content-type': req.headers['content-type'],
      });
      console.log('[function-call] body:', JSON.stringify(raw));
    } catch (_) {}
    let { name, args = {}, sessionId = '', botUid = '' } = raw;

    // Fallbacks to support different payload shapes from OpenMic plans/UIs
    if (!name) {
      if (raw.functionName) name = raw.functionName;
      else if (Object.prototype.hasOwnProperty.call(raw, 'caseId')) {
        name = 'getCaseById';
        args = { caseId: raw.caseId };
      } else if (Object.prototype.hasOwnProperty.call(raw, 'medicalId')) {
        name = 'getPatientById';
        args = { medicalId: raw.medicalId };
      }
    }
    if (!sessionId) sessionId = raw.session_id || raw.session || '';
    if (!botUid) botUid = raw.bot_uid || raw.botId || raw.botUID || '';
    // Try headers/metadata as last resort for botUid
    if (!botUid) {
      const headerBotUid = req.headers['x-openmic-bot-uid'] || req.headers['x-bot-uid'] || '';
      const metaBotUid = raw.metadata?.botUid || raw.metadata?.botUID || '';
      botUid = String(headerBotUid || metaBotUid || '');
    }

    if (!name) return res.status(400).json({ error: 'function name is required (e.g., getCaseById)', received: raw });

    // For demo, we support a medical domain function: getPatientById
    if (name === 'getPatientById') {
      const { medicalId } = args;
      if (!medicalId) return res.status(400).json({ error: 'medicalId is required' });

      // Simulated record (replace with DB lookup if desired)
      const record = {
        id: String(medicalId),
        name: 'John Doe',
        dob: '1985-04-12',
        allergies: ['Penicillin'],
        medications: ['Atorvastatin'],
        lastVisit: '2024-12-01',
      };

      // Append function call log to CallLog for this session (upsert)
      if (sessionId) {
        await CallLog.findOneAndUpdate(
          { sessionId },
          {
            sessionId,
            botUid,
            $push: { functionCalls: { name, input: { medicalId }, output: record, at: new Date() } },
          },
          { upsert: true, new: true }
        );
      }

      return res.json({ ok: true, record });
    } else if (name === 'getCaseById') {
      // Legal domain variant
      const { caseId } = args;
      if (!caseId) return res.status(400).json({ error: 'caseId is required' });

      const record = {
        id: String(caseId),
        clientName: 'Jane Smith',
        caseType: 'Civil - Property Dispute',
        status: 'Open',
        lastHearing: '2025-07-28',
        notes: 'Initial evidence collection in progress.',
      };

      if (sessionId) {
        await CallLog.findOneAndUpdate(
          { sessionId },
          {
            sessionId,
            botUid,
            $push: { functionCalls: { name, input: { caseId }, output: record, at: new Date() } },
          },
          { upsert: true, new: true }
        );
      }

      return res.json({ ok: true, record });
    }

    return res.status(400).json({ error: `Unsupported function: ${name}` });
  } catch (e) {
    return res.status(500).json({ error: 'function-call processing failed' });
  }
});

// Post-call webhook: receive transcript and metadata, persist to DB
router.post('/post-call', async (req, res) => {
  try {
    const { sessionId = '', botUid: bodyBotUid = '', metadata = {}, transcript = [], startedAt, endedAt, summary = '', questions = [], userId = null } = req.body || {};

    // Try to populate botUid from multiple places for reliability
    const headerBotUid = req.headers['x-openmic-bot-uid'] || req.headers['x-bot-uid'] || '';
    const metaBotUid = metadata?.botUid || metadata?.botUID || '';
    const botUid = String(bodyBotUid || headerBotUid || metaBotUid || '');

    // Normalize transcript messages into { role, text, at }
    let normalized = Array.isArray(transcript)
      ? transcript
          .filter(m => m && (m.text || m.content))
          .map(m => ({
            role: m.role === 'assistant' ? 'agent' : m.role || 'user',
            text: m.text || m.content,
            at: m.at ? new Date(m.at) : new Date(),
          }))
      : [];

    // If no transcript provided but we have a summary, create a minimal one so UI isn't blank
    if ((!normalized || normalized.length === 0) && summary) {
      normalized = [
        { role: 'agent', text: summary, at: new Date() },
      ];
    }

    const doc = await CallLog.findOneAndUpdate(
      { sessionId },
      {
        sessionId,
        botUid,
        startedAt: startedAt ? new Date(startedAt) : new Date(),
        endedAt: endedAt ? new Date(endedAt) : new Date(),
        metadata,
        summary,
        questions: Array.isArray(questions) ? questions : (questions ? [String(questions)] : []),
        userId: userId || metadata?.userId || undefined,
        $push: { transcript: { $each: normalized } },
      },
      { upsert: true, new: true }
    );

    return res.json({ ok: true, id: doc._id });
  } catch (e) {
    return res.status(500).json({ error: 'post-call processing failed' });
  }
});

export default router;
