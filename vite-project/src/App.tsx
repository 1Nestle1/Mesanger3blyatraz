import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
//@ts-ignore
import SignInPage from './Pages/Signin.tsx'
//@ts-ignore
import ContourAnimation from './Pages/sosal.tsx'
// import './App.css';
import Register from './Pages/register.tsx'
//@ts-ignore
const App=()=>{
    return(
        <BrowserRouter> 
                <Routes>
  <Route path="/" element={<Navigate to="/main" replace />} />
  <Route path="/main" element={<ContourAnimation />} />
  <Route path="/sign_in" element={<SignInPage />} />
  <Route path='/register' element={<Register />} />
</Routes>
        </BrowserRouter>
    )


  }
export default App

