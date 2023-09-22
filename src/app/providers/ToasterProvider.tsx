'use client'

import { Toaster } from 'react-hot-toast'

// we do this because  Toaster must be a client compent
// instead we are using it in app folder by deafault all components are server side components
const ToasterProvider = () => {
  return <Toaster />
}

export default ToasterProvider
