import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"
import { store } from "./app/store"
import { ClerkProvider } from '@clerk/clerk-react'


const root = ReactDOM.createRoot(document.getElementById('root'));
const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
