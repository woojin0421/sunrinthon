import { useState } from "react"; //초기값 설정용
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './Signup.module.css';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState(false); // false: 남자, true: 여자
  const [age, setAge] = useState(0);
  const [tags, setTags] = useState([0]);
  const navigate = useNavigate();


  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('http://172.30.7.199:28080/api/users/auth/registration/',{
        "email": email,
        "password1": password,
        "password2": confirmPassword,
        "name": username,
        "tags": tags,
        "gender": gender,
        "age": age
      });
      if (response.status === 201) {
        console.log('회원가입 성공');
        navigate('/login'); 
      }
      else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
      
    } catch (error) {
      if(error.response.status === 500) {
        //이래서 타입스크립트를 써야합니다
        alert('이메일이 이미 존재합니다. 다른 이메일을 사용해주세요.');
      }
      else if (error.response?.data?.password1[0] === 'The two password fields didn\'t match.') {
          alert('비밀번호가 일치하지 않습니다.');
        } else if(error.response?.data?.password1[0] === 'This password is too short. It must contain at least 8 characters.') {
          alert('비밀번호는 최소 8자 이상이여야 하고 영문, 숫자, 특수문자를 포함해야 합니다.');
        } else if(error.response?.data?.password1[0] === 'This password is too common.') {
          alert('비밀번호가 너무 일반적입니다. 다른 비밀번호를 사용해 주세요.');
        }
    }
  }
    return (
      <>
      <div className={styles.signupContainer}>
        <h1 className={styles.title}>회원가입</h1>
        <form className={styles.signupForm} onSubmit={handleSignUp}>
        <label htmlFor="username">유저 이름:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="유저 이름"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">비밀번호 확인:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="gender">성별:</label>
        <select
          id="gender"
          name="gender"
          value={gender ? 'female' : 'male'}
          onChange={e => setGender(e.target.value === 'female')}
        >
          <option value="male">남자</option>
          <option value="female">여자</option>
        </select>
        <label htmlFor="age">나이:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={e => setAge(parseInt(e.target.value))}
        />
        <label htmlFor="tags">태그 선택:</label>
        <div id="tags" className={styles.tagsContainer}>
          <label>
          <input
            type="checkbox"
            value={0}
            checked={tags.includes(0)}
            onChange={e => {
            if (e.target.checked) {
              setTags([...tags, 0]);
            } else {
              setTags(tags.filter(tag => tag !== 0));
            }
            }}
          />
          헬스
          </label>
          <label>
          <input
            type="checkbox"
            value={1}
            checked={tags.includes(1)}
            onChange={e => {
            if (e.target.checked) {
              setTags([...tags, 1]);
            } else {
              setTags(tags.filter(tag => tag !== 1));
            }
            }}
          />
          고혈압
          </label>
          <label>
          <input
            type="checkbox"
            value={2}
            checked={tags.includes(2)}
            onChange={e => {
            if (e.target.checked) {
              setTags([...tags, 2]);
            } else {
              setTags(tags.filter(tag => tag !== 2));
            }
            }}
          />
          골다공증
          </label>
          <label>
          <input
            type="checkbox"
            value={0}
            checked={tags.includes(3)}
            onChange={e => {
            if (e.target.checked) {
              setTags([...tags, 3]);
            } else {
              setTags(tags.filter(tag => tag !== 3));
            }
            }}
          />
          당뇨
          </label>
          <label>
          <input
            type="checkbox"
            value={3}
            checked={tags.includes(4)}
            onChange={e => {
            if (e.target.checked) {
              setTags([...tags, 4]);
            } else {
              setTags(tags.filter(tag => tag !== 4));
            }
            }}
          />
          
          일반
          </label>
        </div>
        <button type="submit">회원가입</button>
        </form>
      </div>
      </>
    );
}
export default Signup