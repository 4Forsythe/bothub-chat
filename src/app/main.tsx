import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { store } from './redux';
import { Provider } from 'react-redux';

import { App } from './app';

import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
