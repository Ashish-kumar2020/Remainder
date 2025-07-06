import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {store} from "./store.ts";
import { Provider as ReduxProvider } from "react-redux";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
      <App />

      </ReduxProvider>

    </QueryClientProvider>
  </StrictMode>,
)
