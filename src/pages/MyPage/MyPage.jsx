import React, { useState } from 'react';
import styles from './MyPage.module.css';
import {FiHeart} from 'react-icons/fi';
import useAuthStore from '../../stores/userAuthStore.js';

const savedRecipes = [
  {
    id: 1,
    name: '된장찌개',
    image: 'https://th.bing.com/th/id/OIP.-sOgUhskDWvsX7IjvpnFRAHaHa?w=187&h=188&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3',
    savedDate: '2025.07.19',
    tags: ['한식', '건강식', '집밥']
  },
  {
    id: 2,
    name: '파스타 알리오 올리오',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Tv_wM5sRFXJ1KK5ByASvFwHaJ3?pid=ImgDet&w=193&h=257&c=7&dpr=1.8&o=7&rm=3',
    savedDate: '2025.07.19',
    tags: ['양식', '파스타', '간편요리']
  },
  {
    id: 3,
    name: '닭가슴살 샐러드',
    image: 'https://th.bing.com/th/id/OIP.1YMILEGuGJixfWMHXG85TwHaFC?w=249&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3',
    savedDate: '2025.07.19',
    tags: ['건강식', '다이어트', '단백질']
  }
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const user = useAuthStore.getState().user;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
       <h1>마이페이지</h1>
        <h3 className={styles.userInfo}>
          <span className={styles.userLabel}>유저이름</span>
          <span className={styles.userValue}>{user.name}</span>
        </h3>
        <h3 className={styles.userInfo}>
          <span className={styles.userLabel}>유저이메일</span>
          <span className={styles.userValue}>{user.email}</span>
        </h3>
      </header>

      <nav className={styles.tabs}>
        <button  className={`${styles.tab} ${activeTab === 'saved' ? styles.active : ''}`} onClick={() => setActiveTab('saved')}>
          저장한 레시피
        </button>
        <button className={`${styles.tab} ${activeTab === 'plans' ? styles.active : ''}`} onClick={() => setActiveTab('plans')}>
          나의 식단 계획
        </button>
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'saved' && (
          <div className={styles.recipeGrid}>
            {savedRecipes.map(recipe => (
              <div key={recipe.id} className={styles.recipeCard}>
                <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
                <div className={styles.recipeInfo}>
                  <h3>{recipe.name}</h3>
                  <p className={styles.savedDate}>{recipe.savedDate} 저장</p>
                </div>
                <button className={styles.recipeActionButton}>
                  <FiHeart className={styles.heartIcon} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'plans' && (
          <div className={styles.plansSection}>
            <div className={styles.todayMeals}>
              <div className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <h3>아침</h3>
                  <span className={styles.mealTime}>08:30</span>
                </div>
                <div className={styles.mealContent}>
                  <div className={styles.mealItem}>
                    <img src="https://th.bing.com/th/id/OIP.H9dyqOAt5Jvo0omx_apZ6AHaEL?w=316&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3" alt="아침" />
                    <div className={styles.mealInfo}>
                      <h4>계란말이</h4>
                      <span className={styles.mealCalories}>320 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <h3>점심</h3>
                  <span className={styles.mealTime}>12:45</span>
                </div>
                <div className={styles.mealContent}>
                  <div className={styles.mealItem}>
                    <img src="https://th.bing.com/th/id/OIP.BFV0zQewf3dedSsZ6uYpkQHaFF?w=256&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3" alt="점심" />
                    <div className={styles.mealInfo}>
                      <h4>김치찌개</h4>
                      <span className={styles.mealCalories}>450 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <h3>저녁</h3>
                  <span className={styles.mealTime}>19:15</span>
                </div>
                <div className={styles.mealContent}>
                  <div className={styles.mealItem}>
                    <img src="https://th.bing.com/th/id/OIP.mz1tEtxd8X9V3eKbkv2oEwHaE6?w=237&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3" alt="저녁" />
                    <div className={styles.mealInfo}>
                      <h4>불고기</h4>
                      <span className={styles.mealCalories}>520 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <h3>후식</h3>
                  <span className={styles.mealTime}>15:30</span>
                </div>
                <div className={styles.mealContent}>
                  <div className={styles.mealItem}>
                    <img src="https://th.bing.com/th/id/OIP.bxUB94dEa2YK2iIsthZ2WgHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3" alt="후식" />
                    <div className={styles.mealInfo}>
                      <h4>그릭요거트</h4>
                      <span className={styles.mealCalories}>150 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.nutritionSummary}>
              <h3>오늘의 영양 정보</h3>
              <div className={styles.nutritionBars}>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>총 칼로리</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '85%' }}></div>
                  </div>
                  <span className={styles.nutritionValue}>1,440/1,800 kcal</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>단백질</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '75%', backgroundColor: '#4CAF50' }}></div>
                  </div>
                  <span className={styles.nutritionValue}>90/120g</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>탄수화물</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '65%', backgroundColor: '#2196F3' }}></div>
                  </div>
                  <span className={styles.nutritionValue}>195/300g</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>지방</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '50%', backgroundColor: '#FFC107' }}></div>
                  </div>
                  <span className={styles.nutritionValue}>45/80g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
