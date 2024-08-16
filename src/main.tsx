import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';

// Instanciamos QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <Router />
    </QueryClientProvider>
  </React.StrictMode>,
)
