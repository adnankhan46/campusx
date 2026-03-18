import { registerUser, removeUserBySocketId } from '../socketManager.js';
import { registerCommentHandlers } from './comment.handler.js';
import { registerNotificationHandlers } from './notification.handler.js';

export const registerConnectionHandlers = (io, socket) => {
  // Register the user
  socket.on('register', (userId) => {
    if (!userId) {
      console.error('Register event received without userId:', socket.id);
      return;
    }
    registerUser(userId, socket.id);
    console.log(`User registered: '${userId}' with socket id: [${socket.id}]`);
  });

  // Register other handlers
  registerCommentHandlers(io, socket);
  registerNotificationHandlers(io, socket);

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const userId = removeUserBySocketId(socket.id);
    if (userId) {
      console.log(`User ${userId} removed from connected users.`);
    }
  });
};