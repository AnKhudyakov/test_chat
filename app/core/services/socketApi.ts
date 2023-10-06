import { io, Socket } from 'socket.io-client';
import type { AppDispatch } from '../redux/index';
import { Chat } from '../types';
import { setChatsList } from '../redux/slices/chatSlice';

let socket: Socket | null = null;

export const connectSocket = (name: string, dispatch: AppDispatch) => {
  if (!socket) {
    socket = io('https://ocket-chat-server.onrender.com', {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('connect');

      socket?.emit('userJoined', name);
      socket?.on('getChats', (chats: Chat[]) => {
        dispatch(setChatsList(chats));
      });
    });

    socket.on('disconnect', () => {
      socket = null;
    });
  }
};

export const getSocket = () => {
  if (!socket) {
    console.log('Socket is disconnected');
  }
  return socket;
};
