import { Server } from 'socket.io';
import { registerConnectionHandlers } from './handlers/connection.handler.js';
import dotenv from 'dotenv';

dotenv.config();

const allowedFrontendOrigin = ['http://localhost:5174', process.env.FRONTEND_ORIGIN];

const setupSocket = (httpserver) => {
  const io = new Server(httpserver, {
    cors: {
      origin: ['http://localhost:5173', ...allowedFrontendOrigin],
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected from src/socket/index.js:', socket.id);
    registerConnectionHandlers(io, socket);
  });
};

export default setupSocket;