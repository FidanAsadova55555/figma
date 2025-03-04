import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/style.scss'
import App from './App.jsx'
import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  QueryClient, 
  QueryClientProvider 
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>

    <App />
    </QueryClientProvider>

  </StrictMode>,
)
