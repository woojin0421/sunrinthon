import React from 'react';
import styles from './MealSlot.module.css';

const MealSlot = ({ title, onDrop, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const recipeData = JSON.parse(e.dataTransfer.getData('application/json'));
    onDrop(recipeData);
  };

  return (
    <div 
      className={styles.mealSlot}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className={styles.mealTitle}>{title}</h3>
      <div className={styles.mealContent}>
        {children}
      </div>
    </div>
  );
};

export default MealSlot;
