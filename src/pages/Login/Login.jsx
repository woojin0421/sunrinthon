import { useState } from "react"; //초기값 설정용
import { useNavigate , Link } from "react-router-dom"; 
import axios from 'axios';
import styles from './Login.module.css';
import useAuthStore from '../../stores/userAuthStore';

const Login = ({setAuth}) => {  
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlerSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://172.30.7.199:28080/api/users/auth/login/', {
                "email": email,
                "password": password
            });
            console.log('status:', response.status);
            if (response.status === 200) { 
                const { access, user } = response.data;

                 login(user, access);
                localStorage.setItem('authToken', 'Bearer '+access);
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(true);
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || '서버와의 통신에 실패했습니다');
        } finally {
            setLoading(false);
        }
    }        
    const handleSignUp = () => {
        navigate('/signup');
    }
    return (
       <div className={styles.loginContainer}>
  <h1 className={styles.title}>LOGIN</h1>
  <form className={styles.loginForm} onSubmit={handlerSubmit}>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="이메일"
      required
      value={email}
      onChange={e => setEmail(e.target.value)}
    />

    <input
      type="password"
      id="password"
      name="password"
      placeholder="비밀번호"
      required
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
    
    <button type="submit">로그인</button>
    <div className={styles.row}>
      <Link className={styles.signUpLink} to="/signup">회원가입</Link>
    </div>
  </form>
</div>

    );
}
export default Login;