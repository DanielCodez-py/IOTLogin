import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import { useState } from 'react'
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import Registration from './components/Registration/Registration';


function App() {
  const [startLogin, setStartLogin] = useState(false);
  const handleStartLogin = () => {
    setStartLogin(!startLogin);
  }

  return (
    <main className='app'>
      {startLogin ? (
        <Login startLogin={handleStartLogin}/>
      ) : (
        <Registration startLogin={handleStartLogin}/>
      )}
     
    </main>
  )
}

export default App
