import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '../../types';
import type { RootState } from '../index';
import { Socket } from 'socket.io-client';

const initialState = {
  name: '',
  chatList: [] as Chat[],
  socket: null as Socket | null,
  //isLoading: false as boolean,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setChatsList: (state, { payload: chatList }: PayloadAction<Chat[]>) => {
      state.chatList = chatList;
    },
    setName: (state, { payload: name }: PayloadAction<string>) => {
      state.name = name;
    },
    // setSocket: (state, action: PayloadAction<Socket|null>) => {
    //   state.socket = action.payload ? { ...action.payload } : null;;
    // },
    // setLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
    //   state.isLoading = isLoading;
    // },
  },
});

export const {
  setChatsList,
 // setSocket,
  setName,
  //setLoading,
} = slice.actions;

export const selectChatList = (state: RootState) => state.user.chatList;
export const selectName = (state: RootState) => state.user.name;
export const selectSocket = (state: RootState) => state.user.socket;

export default slice.reducer;
