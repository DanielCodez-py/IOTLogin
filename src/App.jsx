import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import { Helmet } from 'react-helmet'
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
      <Helmet>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IOT Login </title>
      </Helmet>
      {startLogin ? (
        <Login startLogin={handleStartLogin}/>
      ) : (
        <Registration startLogin={handleStartLogin}/>
      )}
     
    </main>
  )
}

export default App
