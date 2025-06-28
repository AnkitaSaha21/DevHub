import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <ThemeProvider>
      <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
    </AuthProvider>
    
  </StrictMode>,
)
