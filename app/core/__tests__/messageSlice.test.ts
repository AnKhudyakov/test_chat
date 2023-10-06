import reducer, {
  selectDeleteMessageModal,
  selectEditMessageModal,
  selectIsShowEditMessage,
  selectSelectedMessage,
  setDeleteMessageModal,
  setEditMessageModal,
  setIsShowEditMessage,
  setSelectedMessage,
} from '../redux/slices/messageSlice';
import { store } from '../redux/store';

const currentState = store.getState();

const initMessage = {
  _id: '1',
  text: 'Hello',
  createdAt: new Date(),
  user: {
    _id: '2',
    name: 'John',
    avatar: 'avatar_url',
  },
};

describe('messageSlice reducer', () => {
  const initialState = {
    selectedMessage: null,
    isShowEditMessage: false,
    editMessageModal: false,
    deleteMessageModal: false,
  };

  it('should handle setSelectedMessage', () => {
    const nextState = reducer(initialState, setSelectedMessage(initMessage));
    expect(nextState.selectedMessage).toEqual(initMessage);
  });

  it('should handle setIsShowEditMessage', () => {
    const nextState = reducer(initialState, setIsShowEditMessage(true));
    expect(nextState.isShowEditMessage).toEqual(true);
  });

  it('should handle setEditMessageModal', () => {
    const nextState = reducer(initialState, setEditMessageModal(true));
    expect(nextState.editMessageModal).toEqual(true);
  });

  it('should handle setDeleteMessageModal', () => {
    const nextState = reducer(initialState, setDeleteMessageModal(true));
    expect(nextState.deleteMessageModal).toEqual(true);
  });
});

describe('messageSlice selectors', () => {
  it('selectSelectedMessage should return selectedMessage', () => {
    const state = {
      ...currentState,
      message: { ...currentState.message, selectedMessage: initMessage },
    };
    const result = selectSelectedMessage(state);
    expect(result).toEqual(initMessage);
  });

  it('selectIsShowEditMessage should return isShowEditMessage', () => {
    const isShowEditMessage = true;
    const state = {
      ...currentState,
      message: { ...currentState.message, isShowEditMessage },
    };
    const result = selectIsShowEditMessage(state);
    expect(result).toEqual(isShowEditMessage);
  });

  it('selectEditMessageModal should return editMessageModal', () => {
    const editMessageModal = true;
    const state = {
      ...currentState,
      message: { ...currentState.message, editMessageModal },
    };
    const result = selectEditMessageModal(state);
    expect(result).toEqual(editMessageModal);
  });

  it('selectDeleteMessageModal should return deleteMessageModal', () => {
    const deleteMessageModal = true;
    const state = {
      ...currentState,
      message: { ...currentState.message, deleteMessageModal },
    };
    const result = selectDeleteMessageModal(state);
    expect(result).toEqual(deleteMessageModal);
  });
});
