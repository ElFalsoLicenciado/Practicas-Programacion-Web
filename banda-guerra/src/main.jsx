import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {AuthProvider} from './context/AuthContext.jsx';
import Router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
