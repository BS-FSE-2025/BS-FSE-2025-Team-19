import React from 'react'
import ReactDOM from 'react-dom'
import { UserContextProvider } from './contexts/userContext'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';
import CssBaseline from '@mui/material/CssBaseline'
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import './index.css';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <UserContextProvider>
    <CacheProvider value={cacheRtl}>
      <Layout />
      </CacheProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
