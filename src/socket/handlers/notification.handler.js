import Notification from '../../modules/notification/notification.model.js';

/**
 * Persists a comment notification to the database.
 */
export const createCommentNotification = async ({ comment, postOwnerId, postId }) => {
  const notification = new Notification({
    from: comment.userId,
    to: postOwnerId,
    notificationType: 'comment',
    text: comment.text,
    postId: postId,
    isRead: false,
  });

  await notification.save();
  return notification;
};

/**
 * Register any future notification-specific socket events here.
 */
export const registerNotificationHandlers = (io, socket) => {
  // e.g. socket.on('markAsRead', ...) can go here
};