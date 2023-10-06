import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import messageReducer from './slices/messageSlice';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  message: messageReducer

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
