import './register.css'
import ContourAnimation from "./sosal";

function Register() {
  return (
    <div className="SignInPage relative min-h-screen flex items-center justify-center">
      {/* 🎨 Background */}
      <ContourAnimation />

      {/* 📦 Sign-in card */}
      <div className="signincard relative z-10">
        <div className="in">
          <h1 className="signin">Welcome</h1>

          <div className="TextInputs">
            <div className="emailblock">
              <h1 className="em">email</h1>
              <input className="email" type="email" placeholder="" />
            </div>

            <div className="passblock">
              <h1 className="pass">password</h1>
              <input className="password" type="password" placeholder="" />
            </div>
          </div>

          <div className="buttons">
            <div className="signinbutton">
              <label className="signinbutom">signin</label>
            </div>
            <div className="registerbutton">
              <label className="registerbutom">register</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
