import React, { useState } from "react";
import axios from "axios";
import styles from "./AddRecipeModal.module.css";
import useAuthStore from "../../stores/useAuthStore";

const AddRecipeModal = ({ onClose, onSuccess }) => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [kcal, setKcal] = useState("");
    const [carbohydrate, setCarbohydrate] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
    const [dietary_fiber, setDietaryFiber] = useState("");
    const [calcium, setCalcium] = useState("");
    const [sodium, setSodium] = useState("");
    const [ingredients, setIngredients] = useState("");

  const user = useAuthStore.getState().user;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("tags", tags);
    formData.append("name", user.name);
    formData.append("kcal", kcal);
    formData.append("carbohydrate", carbohydrate);
    formData.append("protein", protein);
    formData.append("fat", fat);
    formData.append("dietary_fiber", dietary_fiber);
    formData.append("calcium", calcium);
    formData.append("sodium", sodium);
    formData.append("ingredients", ingredients);

    try {
      await axios.post("http://172.30.7.199:28080/diet/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      alert("레시피 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>레시피 추가</h2>
        <form onSubmit={handleSubmit}>
          <label>
            사진 추가
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </label>
          <label>
            설명
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="레시피 설명을 입력하세요"
              required
            />
          </label>
          <label>
            태그 (쉼표로 구분)
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="예: 한식, 매운, 간단"
            />
          </label>
            <label>
                칼로리 (kcal)
                <input
                type="number"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
                placeholder="예: 500"
                />
            </label>
            <label>
                탄수화물 (g)
                <input
                type="number"
                value={carbohydrate}
                onChange={(e) => setCarbohydrate(e.target.value)}
                placeholder="예: 50"
                />
            </label>
            <label>
                단백질 (g)
                <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="예: 20"
                />
            </label>
            <label>
                지방 (g)
                <input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="예: 10"
                />
            </label>
            <label>
                식이섬유 (g)
                <input
                type="number"
                value={dietary_fiber}
                onChange={(e) => setDietaryFiber(e.target.value)}
                placeholder="예: 5"
                />
            </label>
            <label>
                칼슘 (mg)
                <input
                type="number"
                value={calcium}
                onChange={(e) => setCalcium(e.target.value)}
                placeholder="예: 200"
                />
            </label>
            <label>
                나트륨 (mg)
                <input
                type="number"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                placeholder="예: 300"
                />
            </label>
            <label>
                재료
                <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="재료를 입력하세요 (예: 쌀, 물, 소금)"
                required
                />
            </label>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={loading}>
              {loading ? "추가 중..." : "추가"}
            </button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;