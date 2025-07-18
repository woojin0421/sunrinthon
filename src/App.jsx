import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import MyPage from './pages/MyPage/MyPage.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Recipe from './pages/Recipe/Recipe.jsx'
import { Routes, Route , useLocation, useNavigate} from 'react-router-dom'
import './global.css';

function App() {

  const [auth, setAuth] = useState(false); 
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log('auth', auth);
    const publicPaths = ['/', '/login', '/signup']
    if (!auth && !publicPaths.includes(location.pathname)) {
      navigate('/login')
    }
  }, [auth, location, navigate])


  const showHeader = ![ '/login', '/signup'].includes(location.pathname)

  return ( 
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        {!auth && (
          <>
            <Route path="/login" 
            element={<Login auth={auth}  setAuth={setAuth} />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {auth && (
          <>
            <Route path="/my" element={<MyPage />} />
            <Route path="/recipe" element={<Recipe />} />
          </>
        )}
      </Routes>
    </div>

  ) 
    
}

export default App