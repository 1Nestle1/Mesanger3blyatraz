import { useDebugValue, useState } from 'react'
import './Signin.css'

function SignInPage() {
  return (
    <div className='SignInPage'>
     <div className="signincard">
      <div className="in">
      <h1 className='signin'>Welcome</h1>
        <div className="TextInputs">
        <div className="emailblock">
          <h1 className="em">email</h1>
        <input className='email' type="email" placeholder='' />
        </div>
        <div className="passblock">
        <h1 className="pass">password</h1>
        <input className='password' type="password" placeholder='' />
        </div>
        </div>
      <div className="buttons">
      <div className="signinbutton">
        <label htmlFor="" className="signinbutom">signin</label>
        </div>
      <div className="registerbutton">
        <label htmlFor="" className="registerbutton">register</label>
        </div>
      </div>
     </div>
    </div>
    </div>
  )
}


export default SignInPage
