import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/resetpassword/:id" element={<ResetPassword/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
