import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
//import { projectApi } from './services/project';

const rootReducer = combineReducers({
  user: userReducer,
  //[socketApi.reducerPath]: socketApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
 // middleware: (getDefaultMiddleware) =>
  //  getDefaultMiddleware().concat(socketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
