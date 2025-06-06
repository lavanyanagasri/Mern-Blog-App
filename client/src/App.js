import './App.css';
import Post from './components/Post';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import Createpost from './pages/Createpost';
import Postpage from './pages/Postpage';
import Editpost from './pages/Editpost';
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={  <Index /> } />
      <Route path='/login' element={<Login/>}  />
       <Route path='/register' element={<Register/>}/>
       <Route path='/create' element={<Createpost/>} />
       <Route path='/edit' element={<Editpost/>} />
      </Route>
      
    </Routes>
    </UserContextProvider>
  );
}

export default App;
