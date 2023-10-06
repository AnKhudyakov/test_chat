import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Chat } from '../../types';
import type { RootState } from '../index';

const initialState = {
  chatList: [
    // {
    //   author: { _id: '651d5ae03e4e548e20d5d950', name: 'Ted' },
    //   createdAt: '2023-10-05T13:32:12.871Z',
    //   messages: [{}],
    //   name: 'Second',
    //   _id: '651ebadc46bd716db553cc63',
    // },
  ] as Chat[],
  isShowModalDelete: false,
  selectedChat: null as Chat | null,
  isShowSearch: false,
  filteredChatList: [
    // {
    //   author: { _id: '651d5ae03e4e548e20d5d950', name: 'Ted' },
    //   createdAt: '2023-10-05T13:32:12.871Z',
    //   messages: [{}],
    //   name: 'Second',
    //   _id: '651ebadc46bd716db553cc63',
    // },
  ] as Chat[],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatsList: (state, { payload: chatList }: PayloadAction<Chat[]>) => {
      state.chatList = chatList;
    },
    setIsShowModalDelete: (
      state,
      { payload: isShowModalDelete }: PayloadAction<boolean>
    ) => {
      state.isShowModalDelete = isShowModalDelete;
    },
    setSelectedChat: (
      state,
      { payload: selectedChat }: PayloadAction<Chat | null>
    ) => {
      state.selectedChat = selectedChat;
    },
    setIsShowSearch: (
      state,
      { payload: isShowSearch }: PayloadAction<boolean>
    ) => {
      state.isShowSearch = isShowSearch;
    },
    setFilteredChatList: (
      state,
      { payload: filteredChatList }: PayloadAction<Chat[]>
    ) => {
      state.filteredChatList = filteredChatList;
    },
  },
});

export const {
  setChatsList,
  setIsShowModalDelete,
  setSelectedChat,
  setIsShowSearch,
  setFilteredChatList,
} = slice.actions;

export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectIsShowModalDelete = (state: RootState) =>
  state.chat.isShowModalDelete;
export const selectSelectedChat = (state: RootState) => state.chat.selectedChat;
export const selectIsShowSearch = (state: RootState) => state.chat.isShowSearch;
export const selectFilteredChatList = (state: RootState) =>
  state.chat.filteredChatList;

export default slice.reducer;
