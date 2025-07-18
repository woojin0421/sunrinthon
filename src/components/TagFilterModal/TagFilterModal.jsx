import React, { useState } from 'react';
import styles from './TagFilterModal.module.css';

const SAMPLE_TAGS = [
  '건강식', '다이어트', '헬스', '당뇨'
];

const TagFilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleApply = () => {
    onApplyFilters(selectedTags);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>태그로 필터링</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.tagsContainer}>
          {SAMPLE_TAGS.map(tag => (
            <button key={tag} className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selected : ''}`} onClick={() => toggleTag(tag)}>{tag}</button>
          ))}
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.resetButton} onClick={() => setSelectedTags([])}>초기화</button>
          <button className={styles.applyButton} onClick={handleApply}>적용하기 ({selectedTags.length})</button>
        </div>
      </div>
    </div>
  );
};

export default TagFilterModal;
