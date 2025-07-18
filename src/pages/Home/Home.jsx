import { useNavigate, Link } from "react-router-dom"; 
import styles from './Home.module.css'; 
import LinkTo from "../../components/LinkTo/LinkTo";
import LinkToRecipe from "../../components/LinkToRecipe/LinkToRecipe";
const Home = () => {
    
    return (
        <div className={styles.home}>
            <div className={styles.about}>
                <div className={styles.title}>
                    <h3>'나만의 식단을 담다'</h3>
                    <h1>SIGDAM</h1>
                </div>
                <div className={styles.linkTo}>
                    <LinkTo to="/recipe" title="추천 식단 보러가기" description="당신을 위한 맞춤 식단레시피!" />
                    <LinkTo to="/my" title="하루 식단 분석하기" description="오늘 하루 건강하게 섭취했는지 확인하기!" />
                </div>
            </div>
            <div className={styles.hotRecipe}>
                <h2 className={styles.hotRecipeTitle}>지금 핫한 식단 & 레시피</h2>
                <div className={styles.hotRecipeList}>
                    <LinkToRecipe to="/recipe/1" name="장한울" title="디미고 서류탈락 비법"/>
                    <LinkToRecipe to="/recipe/1" name="장한울" title="디미고 서류탈락 비법"/>
                    <LinkToRecipe to="/recipe/1" name="장한울" title="디미고 서류탈락 비법"/>
                    <LinkToRecipe to="/recipe/1" name="장한울" title="디미고 서류탈락 비법"/>
                </div>
            </div>
        </div>
    )
};
export default Home;