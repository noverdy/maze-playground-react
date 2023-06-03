import 'index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'

import UserConfigProvider from './contexts/ConfigContext'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <UserConfigProvider>
      <App />
    </UserConfigProvider>
  </React.StrictMode>
)
