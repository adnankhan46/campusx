import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  from: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}, // Commenter
  to: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true  
  }, // Post owner
  notificationType: { 
    type: String, 
    enum: ['comment', 'notice'], 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 

  },
}, { timestamps: true });

// Check if the model exists, if not create it. Since we are using mongoose models in multiple files while refactoring
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
