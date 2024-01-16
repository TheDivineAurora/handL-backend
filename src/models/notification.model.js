const { default: mongoose } = require("mongoose");

const NotificationSchema = new Schema({
    message: String,
    timestamp: { type: Date, default: Date.now },
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
    handle: { type: mongoose.Schema.ObjectId, ref: 'Handle' }, 

  });
  