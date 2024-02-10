import styles from './toggle.module.css';


export default function Toggle({ index, startingIndex, checkboxStates, handleCheckboxChange}) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checkboxStates[startingIndex + index] || false}
        onChange={() => handleCheckboxChange(startingIndex + index)}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
