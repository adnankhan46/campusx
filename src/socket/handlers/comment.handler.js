import { getSocketId } from '../socketManager.js';
import { createCommentNotification } from './notification.handler.js';

export const registerCommentHandlers = (io, socket) => {
  socket.on('newComment', async (data) => {
    console.log('New comment received:', data);

    const { postOwnerId, comment, postId } = data;
    if (!postOwnerId || !comment || !postId) {
      console.error('Invalid data received for newComment:', data);
      return;
    }

    // Save notification to DB
    await createCommentNotification({ comment, postOwnerId, postId });

    // Emit real-time notification if the post owner is online
    const postOwnerSocketId = getSocketId(postOwnerId);
    if (postOwnerSocketId) {
      io.to(postOwnerSocketId).emit('notification', {
        message: `New comment: ${comment.userGender} from Section ${comment.userSection} "${comment.text}"`,
        postId: postId,
      });
      console.log(`Notified post owner (${postOwnerId}) about the new comment.`);
    } else {
      console.log(`Post owner (${postOwnerId}) is not connected or registered.`);
    }
  });
};