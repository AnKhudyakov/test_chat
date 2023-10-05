import { io, Socket } from 'socket.io-client';
import type { AppDispatch } from '../redux/index';
import { setChatsList } from '../redux/slices/userSlice';
import { Chat } from '../types';

let socket: Socket | null = null;

export const connectSocket = (
  // setSocket: Dispatch<React.SetStateAction<Socket | null>>,
  name: string,
  dispatch: AppDispatch
) => {
  if (!socket) {
    socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
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
    console.log('Socket is disconnected');;
    
  }
  return socket;
};
