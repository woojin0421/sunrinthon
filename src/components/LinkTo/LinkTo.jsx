
import styles from './LinkTo.module.css';
import {useNavigate} from 'react-router-dom';
import Fork_and_knife_with_plate from '../../assets/images/Fork_and_knife_with_plate.png';
import sandwich from '../../assets/images/sandwich.png';
const LinkTo = ({ to, title, description }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };
  return ( 
    <button onClick={handleClick}>
        <div className={styles.linkContainer}>
          
        <div className={styles.imageContainer}>
            <img src={to=="/recipe"?Fork_and_knife_with_plate:sandwich} alt="link icon" className={styles.linkIcon} />
        </div>
            <div className={styles.linkText}>
                <h1 className={styles.title}> {title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.arrowContainer}>
                <img src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="arrow icon" className={styles.arrowIcon} />
            </div>
        </div>
    </button>
  );

};

export default LinkTo;