import React, { useEffect } from 'react';
import styles from './RecipeItem.module.css';

const RecipeItem = ({ recipe, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(recipe));
    if (onDragStart) onDragStart(e, recipe.id);
  };
  useEffect(() => {
    console.log(recipe);
  }, []);

  return (
    <div 
      className={styles.recipeCard}
      draggable
      onDragStart={handleDragStart}
    >
      <div className={styles.recipeImageContainer}>
        <img 
          src={"http://172.30.7.199:28080/api/diet"+recipe.image || 'https://source.unsplash.com/random/300x200?food'} 
          alt={recipe.name}
          className={styles.recipeImage}
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/random/300x200?food';
          }}
        />
      </div>
      
      <div className={styles.recipeContent}>
        <div className={styles.recipeInfo}>
            <h3 className={styles.recipeName}>{recipe.name}</h3>
            <div className={styles.recipeMeta}>
                <div className={styles.tagContainer}>
                    {recipe.tags.map((tag, index) => (
                        <p key={index}>#{tag}</p>   
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.recipeActions}>
            <button className={styles.heartButton}>
                <i className="fas fa-heart"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
