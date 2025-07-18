import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import useAuthStore from '../../stores/userAuthStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate();
const user = useAuthStore.getState().user;
const handleLogout = () => {
  logout();
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  navigate('/login');
}
  return (
    <header className={styles.header}>
      <button onClick={() => navigate('/') && window.location.reload()}>
        <h1 className={styles.title}>SIGDAM</h1>
      </button>
      <nav className={styles.nav}>
        <ul>
            {!useAuthStore.getState().user && (
              <>
                <li><Link to="/login" className={styles.link}>로그인</Link></li>
                <li><Link to="/signup" className={styles.link}>회원가입</Link></li>
              </>
            )
            }
            {useAuthStore.getState().user && (
              <>
                <li><Link onClick={handleLogout} className={styles.link}>로그아웃</Link></li>
                <li><Link to="/recipe" className={styles.link}>레시피</Link></li>
                <li><Link to="/my" className={styles.link}>마이페이지</Link></li>
                <li className={styles.name}>{user.name}</li>
              </>
            )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;