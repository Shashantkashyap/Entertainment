import React, { useState } from 'react'
import SignupPage from '../components/Signup'
import Login from '../components/Login'

function Auth() {
  const [active, setActive] = useState(0)
  return (
    <div className=''>
      {
        active ===0 ?(<SignupPage setActive ={setActive}/>) : (<Login setActive ={setActive}/>)
      }
    </div>
  )
}

export default Auth
