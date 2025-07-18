import React, { useState, useCallback, useEffect } from 'react';
import styles from './Recipe.module.css';
import MealSlot from '../../components/MealSlot/MealSlot';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import TagFilterModal from '../../components/TagFilterModal/TagFilterModal';
import axios from 'axios';
import tune from '../../assets/images/tune.png';
const MEAL_TYPES = [
  { id: 'breakfast', name: '아침' },
  { id: 'lunch', name: '점심' },
  { id: 'dinner', name: '저녁' },
  { id: 'desert', name: '간식' },
];

const Recipe = () => {
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(true);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [meals, setMeals] = useState(
    MEAL_TYPES.reduce((acc, meal) => ({
      ...acc,
      [meal.id]: []
    }), {})
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://172.30.7.199:28080/api/diet/recommends',
            {
                headers: {
                    'Authorization': localStorage.getItem('authToken'),
                }
            }
        );
        console.log(response.data);
        setAllRecipes(response.data); 
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error('레시피를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredRecipes(allRecipes);
    } else {
      setFilteredRecipes(
        allRecipes.filter(recipe => 
          selectedTags.every(tag => recipe.tags?.includes(tag))
        )
      );
    }
  }, [selectedTags, allRecipes]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredRecipes(allRecipes);
    } else {
      setFilteredRecipes(
        allRecipes.filter(recipe => 
          selectedTags.every(tag => recipe.tags.includes(tag))
        )
      );
    }
  }, [selectedTags]);
  const toggleMealPlan = () => {
    setIsMealPlanOpen(!isMealPlanOpen);
  };
  const handleApplyFilters = (tags) => {
    setSelectedTags(tags);
  };

  const handleMealPlan = async () => {
    try {
      const mealTypeMap = {
        'breakfast': '아침',
        'lunch': '점심',
        'dinner': '저녁',
        'desert': '간식'
      };

      for (const [mealType] of Object.entries(mealTypeMap)) {
        const recipes = meals[mealType];
        
        if (!recipes || recipes.length === 0) continue;

        const recipe = recipes[0];
        
        try {
          const response = await axios.post(
            'http://172.30.7.199:28080/api/diet/today',
            {
              diet_type: mealType,
              diet: recipe.id
            },
            {
              headers: {
                'Authorization': localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`${mealType} 식단 저장 성공:`, response.data);
        } catch (error) {
          console.error(`${mealType} 식단 저장 실패:`, error);
        }
      }
      alert('식단이 저장되었습니다!');
    } catch (error) {
      console.error('식단 저장 중 오류 발생:', error);
      alert('식단 저장 중 오류가 발생했습니다.');
    }
  };

  const handleDrop = (mealType, recipe) => {
    setMeals(prev => ({
        ...prev,
        [mealType]: [...prev[mealType], recipe]
      }));
  };

  const removeRecipe = (mealType, recipeId) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(recipe => recipe.id !== recipeId)
    }));
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.mealPlan}>
          <div className={styles.mealPlanHeader}>
            <button onClick={handleMealPlan}>식단 계획하기</button>
          </div>
          <div className={`${styles.mealPlanContent} ${isMealPlanOpen ? styles.open : ''}`}>
            <div className={styles.mealSlots}>
              {MEAL_TYPES.map(mealType => (
                <MealSlot 
                  key={mealType.id} 
                  title={mealType.name} 
                  onDrop={(recipe) => handleDrop(mealType.id, recipe)}
                >
                  {meals[mealType.id]?.map(recipe => (
                    <div key={recipe.id} className={styles.mealItem}>
                      <span>{recipe.name}</span>
                      <button className={styles.removeButton} onClick={() => removeRecipe(mealType.id, recipe.id)} aria-label="Remove recipe">
                        ×
                      </button>
                    </div>
                  ))}
                </MealSlot>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`${styles.mainContent} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <button 
            className={styles.filterButton}
            onClick={() => setShowTagFilter(true)}
            aria-label="Filter recipes by tags"
          >
            <img src={tune} alt="Filter"/>
            필터
            {selectedTags.length > 0 && (
              <span className={styles.filterBadge}>{selectedTags.length}</span>
            )}
          </button>
        </div>
        
        <div className={styles.recipeList}>
          <div className={styles.recipeListContent}>
            <div className={styles.recipeItems}>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <RecipeItem key={recipe.id} recipe={recipe}/>
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>선택한 태그에 해당하는 레시피가 없습니다.</p>
                  <button className={styles.clearFilters} onClick={() => setSelectedTags([])}>필터 초기화</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TagFilterModal isOpen={showTagFilter} onClose={() => setShowTagFilter(false)} onApplyFilters={handleApplyFilters}/>
    </div>
  );
};
export default Recipe;