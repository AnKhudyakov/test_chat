import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/core/redux/store';
import Main from './app/shared/Main';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
