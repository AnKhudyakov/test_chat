import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Chat } from '../../types';
import type { RootState } from '../index';

const initialState = {
  name: '',
  chatList: [] as Chat[],
  isShowModalExit : false
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
    setIsShowModalExit: (state, { payload: isShowModalExit }: PayloadAction<boolean>) => {
      state.isShowModalExit = isShowModalExit;
    },
  },
});

export const {
  setChatsList,
  setName,
  setIsShowModalExit
} = slice.actions;

export const selectChatList = (state: RootState) => state.user.chatList;
export const selectName = (state: RootState) => state.user.name;
export const selectIsShowModalExit = (state: RootState) => state.user.isShowModalExit;


export default slice.reducer;
