import ContourAnimation from "./sosal";
import style from './register.module.css'

function Register() {
  return (
    <div className={`${style.SignInPage}`}>
      {/* 🎨 Background */}
      <ContourAnimation />

      {/* 📦 Sign-in card */}
      <div className={style.signincard + " relative z-10"}>
        <div className={style.in}>
          <h1 className={style.signin}>Welcome</h1>

          <div className={style.TextInputs}>
            <div className={style.emailblock}>
              <h1 className={style.em}>email</h1>
              <input className={style.email} type="email" placeholder="" />
            </div>

            <div className={style.passblock}>
              <h1 className={style.pass}>password</h1>
              <input className={style.password} type="password" placeholder="" />
            </div>
          </div>

          <div className={style.buttons}>
            <div className={style.signinbutton}>
              <label className={style.signinbutom}>signin</label>
            </div>
            <div className={style.registerbutton}>
              <label className={style.registerbutom}>register</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
