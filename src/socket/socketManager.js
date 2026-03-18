const users = {}; // Store userId and socketId mappings

export const registerUser = (userId, socketId) => {
  users[userId] = socketId;
};

export const removeUserBySocketId = (socketId) => {
  for (const userId in users) {
    if (users[userId] === socketId) {
      delete users[userId];
      return userId;
    }
  }
  return null;
};

export const getSocketId = (userId) => {
  return users[userId] || null;
};