import styles from './LinkToRecipe.module.css';
import { useNavigate } from 'react-router-dom';
const LinkToRecipe = ({ to, name, title, image}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to); 
    };
    return (
        <button onClick={handleClick} className={styles.linkContainer}>
            {/* <div className={styles.imageContainer}> */}
                <p className={styles.linkName}>
                    {name}
                </p>
                <h1 className={styles.linkTitle}>
                    {title}
                </h1>
            {/* </div> */}
        </button>
    );
}

export default LinkToRecipe;