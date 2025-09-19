
# Attack Capital – Domain‑Specific AI Intake Agent (OpenMic)

A full‑stack demo for a Legal intake agent using OpenMic:
- Pre‑call webhook returns context before the call
- In‑call Custom Function fetches case details during the call
- Post‑call webhook persists transcript, summary, questions, and function calls to MongoDB
- Dashboard UI with Bots (CRUD) and Logs

## Features
- Legal domain assistant with minimal, light-themed UI and consistent branding
- Bot CRUD: list, create, update, delete bots and show `botUid`
- Call Logs: stored in MongoDB and displayed in UI (transcript, summary, questions, functionCalls)
- Robust post-call handling with fallbacks for botUid and transcript
- Ready-to-use prompts for Call Summary and Success Evaluation

## Tech Stack
- Frontend: React + Vite + TypeScript, Tailwind-based UI components ([src/](cci:7://file:///c:/Users/RAJKUMAR/Downloads/Attack%20capital%20task/neon-sprout-suite/src:0:0-0:0))
- Backend: Node.js + Express (`server/`)
- Database: MongoDB with Mongoose models
- Telephony/Agent: OpenMic API + Webhooks
- Tunneling: ngrok (for webhook exposure in local dev)

## Project Structure
```
neon-sprout-suite/
├─ index.html                       # App entry (title/meta/og, favicon)
├─ public/
│  └─ logo.svg                      # SVG logo (indigo accent)
├─ src/
│  ├─ App.tsx                       # Routes: /, /signin, /signup, /dashboard/*
│  ├─ components/
│  │  ├─ AppSidebar.tsx             # Dashboard sidebar nav
│  │  └─ SiteHeader.tsx             # Global light navbar (logo + links + auth CTAs)
│  └─ pages/
│     ├─ Index.tsx                  # Minimal landing page (light, indigo)
│     ├─ Dashboard.tsx              # Dashboard shell (sidebar + header)
│     ├─ Bots.tsx                   # Bots CRUD UI
│     ├─ Logs.tsx                   # Logs table with botUid/sessionId
│     ├─ SignIn.tsx                 # Demo sign-in
│     └─ SignUp.tsx                 # Demo sign-up
└─ server/
   ├─ index.js                      # Express bootstrap
   ├─ app.js                        # Express app
   ├─ .env.example                  # Example server env
   ├─ routes/
   │  ├─ webhooks.js                # Pre-call, function-call, post-call endpoints
   │  ├─ bots.js                    # Bots CRUD (OpenMic proxy helpers)
   │  └─ logs.js                    # GET /api/logs with filters
   ├─ models/
   │  ├─ CallLog.js                 # Transcript, summary, questions, functionCalls
   │  └─ Bot.js                     # Optional local bot model
   └─ services/
      └─ openmicClient.js           # startCall, bots CRUD via OPENMIC_API_KEY
```

## MongoDB Schema (CallLog)
File: [server/models/CallLog.js](cci:7://file:///c:/Users/RAJKUMAR/Downloads/Attack%20capital%20task/neon-sprout-suite/server/models/CallLog.js:0:0-0:0)
- botId: ObjectId ref to local Bot (optional)
- botUid: string (OpenMic bot UID; used to filter logs)
- userId: ObjectId (optional)
- sessionId: string (indexed; correlates all events in one call)
- startedAt, endedAt: Date
- metadata: Mixed (for any extra info)
- transcript: Array of messages
  - `{ role: 'user'|'agent'|'system', text: string, at: Date }`
- summary: string
- questions: string[]
- functionCalls: Array of function entries
  - `{ name, input, output, at }`

## Backend API
Base URL (dev): `http://localhost:4000`

- Webhooks (configure in OpenMic via ngrok):
  - POST `/webhooks/pre-call`
    - Accepts: `{ botUid, phone, caseId }`
    - Returns domain context to seed the conversation (legal case info if `caseId` provided)
  - POST `/webhooks/function-call`
    - Accepts:
      - `{ name, args, sessionId, botUid }`
      - Supports “flat” payloads too; e.g., `{ caseId: "1003" }` auto-maps to `getCaseById`
    - Functions:
      - `getCaseById`: returns a legal case record and upserts `functionCalls[]`
      - `getPatientById`: demo medical variant
    - Persists `functionCalls[]` and associates `sessionId`, `botUid` (with robust fallbacks)
  - POST `/webhooks/post-call`
    - Accepts: `{ sessionId, botUid, summary, questions, transcript[], metadata, startedAt, endedAt }`
    - Fallbacks:
      - botUid from body → headers (`x-openmic-bot-uid`/`x-bot-uid`) → metadata
      - If transcript missing but summary exists, synthesizes a minimal transcript line to avoid blank UI
- Logs:
  - GET `/api/logs?botUid=&sessionId=&limit=`
- Bots (optional; uses OpenMic API):
  - GET `/api/bots`
  - POST `/api/bots`
  - PATCH `/api/bots/:botUid`
  - DELETE `/api/bots/:botUid`

## Environment Variables

Frontend [.env](cci:7://file:///c:/Users/RAJKUMAR/Downloads/Attack%20capital%20task/neon-sprout-suite/server/.env:0:0-0:0) (repo root):
```ini
VITE_API_BASE_URL=http://localhost:4000
```

Backend `server/.env`:
```ini
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
CORS_ORIGINS=http://localhost:5173
OPENMIC_BASE_URL=https://api.openmic.ai
OPENMIC_API_KEY=YOUR_OPENMIC_API_KEY
```

Note:
- OPENMIC_API_KEY is used only when the backend calls OpenMic APIs (e.g., bot CRUD, startCall). Webhooks do not require it.

## Running Locally

Install dependencies:
```bash
npm install
npm install --prefix server
```

Start backend:
```bash
npm run dev --prefix server
```

Start frontend (new terminal):
```bash
npm run dev
```

Expose backend with ngrok (new terminal):
```bash
ngrok http 4000
```

Copy the ngrok HTTPS URL (e.g., `https://abc123.ngrok.io`) and use it in OpenMic webhooks.

## OpenMic Configuration

- Sign up: https://chat.openmic.ai/signup
- Create API Key: https://chat.openmic.ai/api-key-demo-735023852
- Create or select a Bot in the Dashboard and copy its Bot UID.

### Webhooks
- Pre-Call (POST)
  - URL: `https://<ngrok>/webhooks/pre-call`
- Function-Call (POST)
  - URL: `https://<ngrok>/webhooks/function-call`
  - Headers: `Content-Type: application/json`
  - Function Name: `getCaseById`
  - JSON Schema:
    ```json
    {
      "type": "object",
      "properties": {
        "caseId": { "type": "string", "description": "Legal Case ID provided by the caller" }
      },
      "required": ["caseId"]
    }
    ```
- Post-Call (POST)
  - URL: `https://<ngrok>/webhooks/post-call`

### Bot Prompt (Legal)
Paste this prompt:
```
You are Attack Capital’s legal intake assistant. Greet the caller and ask for their Case ID. When provided, call getCaseById({ caseId }). Confirm case type, status, and last hearing from the function result. Ask 2–3 relevant follow-up questions. Conclude with a brief summary and next steps. Keep tone professional and concise.
```

### Call Summary & Success Evaluation (optional but recommended)

- Call Summary prompt:
```
Summarize the call in 4–6 sentences for a legal intake context. Include: caller name (if stated), phone, Case ID, matter type, status/last hearing, key facts, next steps. Do not invent details; write “not provided” when unknown. End with a single-sentence “Outcome:” line.
```

- Success Evaluation prompt:
```
Evaluate whether the call met legal intake success criteria. Consider: Case ID captured; function used and details referenced; at least 2 follow-up questions; concise closing summary + next steps; professional, compliant tone. Return 2–4 sentence analysis citing evidence from the transcript.
```

- Rubric Type: Pass/Fail
- Pass if: ID captured/attempted, function used/referenced, ≥2 follow-ups, clear closing, professional tone.

## Testing

Manual test for function-call (bypasses OpenMic, useful for verifying your server):
```bash
curl -X POST "https://<ngrok>/webhooks/function-call" \
  -H "Content-Type: application/json" \
  -d '{"name":"getCaseById","args":{"caseId":"1003"},"sessionId":"sess-legal-1","botUid":"YOUR_BOT_UID"}'
```

Then open the Dashboard → Logs. You should see:
- Bot ID populated (via body, headers, or metadata fallbacks)
- Transcript populated (either real or minimal synthesized from summary)
- FunctionCalls appended for the session

If function-call doesn’t hit during OpenMic Test Call:
- Confirm Custom Function name is exactly `getCaseById`
- Confirm method is POST and URL is your current ngrok
- Ensure Content-Type: application/json
- Ensure you test call the bot where the function is added
- Strongly instruct tool usage in the Bot Prompt (as above)

## Screenshots (Add these to `docs/images/` and reference below)
- `docs/images/frontend-home.png` – Landing page (light theme)
- `docs/images/dashboard-logs.png` – Logs with botUid/sessionId, transcript, summary, questions
- `docs/images/openmic-function-config.png` – OpenMic Custom Function configuration
- `docs/images/openmic-webhooks.png` – OpenMic Webhook configuration (pre, post)

Example embeds:
```md
![Home](docs/images/frontend-home.png)
![Logs](docs/images/dashboard-logs.png)
![Function Config](docs/images/openmic-function-config.png)
![Webhooks](docs/images/openmic-webhooks.png)
```

## Troubleshooting

- Bot ID is blank in Logs:
  - Ensure OpenMic sends `botUid` in body, or headers `x-openmic-bot-uid`/`x-bot-uid`, or `metadata.botUid`. The server attempts all fallbacks.

- No function-call received:
  - Check function name (`getCaseById`), method (POST), Content-Type, ngrok URL freshness, and that the Bot Prompt instructs tool usage after the caller provides Case ID.

- Missing transcript in post-call:
  - The server synthesizes a minimal agent line from `summary` to avoid blank UI, but you should enable transcript logging in OpenMic for best results.

- OPENMIC_API_KEY errors:
  - Key is only required for backend-initiated OpenMic API calls (e.g., bots CRUD). Webhooks do not require it.

## Demo Checklist
- Bots CRUD: show listing with `botUid`, create/update/delete cycle.
- OpenMic: show Custom Function config and webhooks pointing to ngrok URLs.
- Test Call: run a Test Call; confirm Logs populate correctly with botUid, transcript, summary, questions, and functionCalls.
- Walkthrough video: short Loom showing the above.

## License
For assignment/demo use.
