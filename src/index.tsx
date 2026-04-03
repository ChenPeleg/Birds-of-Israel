import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {createStore} from 'redux'
import reducer from './store/reducer.ts';
import { Provider } from 'react-redux';

const store = createStore(reducer);
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
