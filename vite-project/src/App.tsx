import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
//@ts-ignore
import SignInPage from './Pages/Signin.tsx'
//@ts-ignore
import ContourAnimation from './Pages/sosal.tsx'
// import './App.css';
import Register from './Pages/register.tsx'
//@ts-ignore
import MainWindow from './Pages/mainwindow.tsx'
const App=()=>{
    return(
        <BrowserRouter> 
                <Routes>
  <Route path="/" element={<Navigate to="/register" replace />} />
  <Route path="/main" element={<ContourAnimation />} />
  <Route path="/sign_in" element={<SignInPage />} />
  <Route path='/register' element={<Register />} />
  <Route path='/main_window' element={<MainWindow />} />
</Routes>
        </BrowserRouter>
    )


  }
export default App

