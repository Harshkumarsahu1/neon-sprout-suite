import mongoose from 'mongoose';

const BotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    botUid: { type: String, default: 'cmfp7x4790029gdmsb1un6l4q' }, // OpenMic bot UID
    domainType: { type: String, enum: ['medical', 'legal', 'receptionist'], required: true },
    prompt: { type: String, default: '' },
    phone: { type: String, default: '' }, // phone number to call on create (optional)
  },
  { timestamps: true }
);

export default mongoose.model('Bot', BotSchema);
