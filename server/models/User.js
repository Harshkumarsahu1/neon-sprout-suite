import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, index: true, unique: true, sparse: true },
    phone: { type: String, default: '' },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
