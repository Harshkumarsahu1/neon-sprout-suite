import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'agent', 'system'], required: true },
    text: { type: String, required: true },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const CallLogSchema = new mongoose.Schema(
  {
    botId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bot' },
    botUid: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String, index: true },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
    metadata: { type: mongoose.Schema.Types.Mixed },
    transcript: { type: [MessageSchema], default: [] },
    // Optional post-call summary and list of key questions captured during the call
    summary: { type: String, default: '' },
    questions: { type: [String], default: [] },
    functionCalls: {
      type: [
        new mongoose.Schema(
          {
            name: String,
            input: mongoose.Schema.Types.Mixed,
            output: mongoose.Schema.Types.Mixed,
            at: { type: Date, default: Date.now }
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('CallLog', CallLogSchema);
