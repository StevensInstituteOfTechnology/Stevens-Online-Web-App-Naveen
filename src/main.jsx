import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Remove no-touch class if it exists (added by some build tools or libraries)
if (document.documentElement.classList.contains('no-touch')) {
  document.documentElement.classList.remove('no-touch')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
