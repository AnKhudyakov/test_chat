import { io, Socket } from 'socket.io-client';
import { Chat } from '../types';
import { Dispatch } from 'react';
import type { AppDispatch } from '../redux/index';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setChatsList } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';

export const connectSocket = (
  setSocket: Dispatch<React.SetStateAction<Socket|null>>,
  name: string,
  dispatch: AppDispatch
) => {
  //const dispatch = useAppDispatch();

  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
  });
  //dispatch(
    setSocket(socket)
    //);

  socket.emit('userJoined', name);
  socket.on('getChats', (chats: Chat[]) => {
    dispatch(setChatsList(chats));
  });

  return () => {
    socket?.disconnect();
  };
};
