import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { useState } from 'react'

function App() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const handleRegisterSuccess = () => {
    setRegisterSuccess(!registerSuccess);
  }

  return (
    <main className='app'>
      {registerSuccess ? (
        <Login handleRegistration={handleRegisterSuccess}/>
      ) : (
        <Register handleRegistration={handleRegisterSuccess}/>
      )}
     
    </main>
  )
}

export default App
