import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../types';
import type { RootState } from '../index';

const initialState = {
  selectedMessage: null as Message | null,
  isShowEditMessage: false,
  editMessageModal: false,
  deleteMessageModal: false,
};

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedMessage: (
      state,
      { payload: selectedMessage }: PayloadAction<Message | null>
    ) => {
      state.selectedMessage = selectedMessage;
    },
    setIsShowEditMessage: (
      state,
      { payload: isShowEditMessage }: PayloadAction<boolean>
    ) => {
      state.isShowEditMessage = isShowEditMessage;
    },
    setEditMessageModal: (
      state,
      { payload: editMessageModal }: PayloadAction<boolean>
    ) => {
      state.editMessageModal = editMessageModal;
    },
    setDeleteMessageModal: (
      state,
      { payload: deleteMessageModal }: PayloadAction<boolean>
    ) => {
      state.deleteMessageModal = deleteMessageModal;
    },
  },
});

export const {
  setSelectedMessage,
  setIsShowEditMessage,
  setEditMessageModal,
  setDeleteMessageModal,
} = slice.actions;

export const selectSelectedMessage = (state: RootState) =>
  state.message.selectedMessage;
export const selectIsShowEditMessage = (state: RootState) =>
  state.message.isShowEditMessage;
  export const selectDeleteMessageModal = (state: RootState) =>
  state.message.deleteMessageModal;
  export const selectEditMessageModal = (state: RootState) =>
  state.message.editMessageModal;

export default slice.reducer;
