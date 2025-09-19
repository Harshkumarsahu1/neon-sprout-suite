import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import botsRouter from './routes/bots.js';
import webhooksRouter from './routes/webhooks.js';
import logsRouter from './routes/logs.js';
import usersRouter from './routes/users.js';

const app = express();

// Configure CORS from env
const origins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/bots', botsRouter);
app.use('/api/logs', logsRouter);
app.use('/api/users', usersRouter);
app.use('/webhooks', webhooksRouter);

export default app;
