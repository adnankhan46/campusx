import { Server } from 'socket.io';

const users = {}; // Store userId and socketId mappings

const setupSocket = (httpserver) => {
  const io = new Server(httpserver, {
    cors: {
      origin: 'http://localhost:5173',  
      credentials: true,
      methods: ['GET', 'POST']
       
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // Register the user
    socket.on('register', (userId) => {
      if (!userId) {
        console.error('Register event received without userId:', socket.id);
        return;
      }
      users[userId] = socket.id;  
      console.log(`User registered: ${userId} with socket id: ${socket.id}`);
    });

    
    socket.on('newComment', (data) => {
      console.log('New comment received:', data);
      
      
      const { postOwnerId, comment, postId } = data;
        if (!postOwnerId || !comment || !postId) {
        console.error('Invalid data received for newComment:', data);
        return;
      }

       
      const postOwnerSocketId = users[postOwnerId];
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit('notification', {
          message: `New comment: ${comment.text}`,
          postId: postId,
        });
        console.log(`Notified post owner (${postOwnerId}) about the new comment.`);
      } else {
        console.log(`Post owner (${postOwnerId}) is not connected or registered.`);
      }
    });

     
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

       
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          console.log(`User ${userId} removed from connected users.`);
          break;
        }
      }
    });
  });
}

export default setupSocket;
