import { useNavigate, Link } from "react-router-dom"; 
import styles from './Home.module.css'; 
import LinkTo from "../../components/LinkTo/LinkTo";
import LinkToRecipe from "../../components/LinkToRecipe/LinkToRecipe";
import { useEffect } from "react";
import useAuthStore from "../../stores/userAuthStore.js";
import axios from "axios";
const Home = () => {
    
    useEffect(() => {
        const response = axios.get('http://172.30.7.199:28080/api/diet/popular/',
            {
                headers: {
                    'Authorization': localStorage.getItem('authToken'),
                },
            }
        );
    }, []);
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
                    <LinkToRecipe to="/recipe" name="example" title="진짜 맛있는 병아리콩 레시피!"/>
                    <LinkToRecipe to="/recipe" name="test1" title="당뇨 환자를 위한 두부 조림!"/>
                    <LinkToRecipe to="/recipe" name="test2" title="-10kg 다이어트 식단 공유합니다!"/>
                    <LinkToRecipe to="/recipe" name="test3" title="어른들을 위한 생선 스테이크!"/>
                </div>
            </div>
        </div>
    )
};
export default Home;