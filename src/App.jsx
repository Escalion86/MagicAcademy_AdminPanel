import React, { useState } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import './App.css'

import Sign from './Pages/Sign'
import Cabinet from './Pages/Cabinet'

function App() {
  const [userState, userSetState] = useState(null)
  if (userState)
    return <Cabinet userState={userState} userSetState={userSetState} />
  else return <Sign userState={userState} userSetState={userSetState} />
}

export default App
