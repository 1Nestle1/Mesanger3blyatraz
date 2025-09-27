import { useDebugValue, useState } from 'react'
import style from './Signin.module.css'

function SignInPage() {
  return (
    <div className={style.SignInPage}>
     <div className={style.signincard}>
      <div className={style.in}>
      <h1 className={style.signin}>Welcome</h1>
        <div className={style.TextInputs}>
        <div className={style.emailblock}>
          <h1 className={style.em}>email</h1>
        <input className={style.email} type="email" placeholder='' />
        </div>
        <div className={style.passblock}>
        <h1 className={style.pass}>password</h1>
        <input className={style.password} type="password" placeholder='' />
        </div>
        </div>
      <div className={style.buttons}>
      <div className={style.signinbutton}>
        <label htmlFor="" className={style.signinbutom}>signin</label>
        </div>
      <div className={style.registerbutton}>
        <label htmlFor="" className={style.registerbutton}>register</label>
        </div>
      </div>
     </div>
    </div>
    </div>
  )
}


export default SignInPage
