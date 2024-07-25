import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
  expirationTime: { type: Date, default: null },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription