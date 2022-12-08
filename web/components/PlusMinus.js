import styles from './PlusMinus.module.css'

export default function PlusMinus ({
  incrementCount,
  decrementCount
}) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.minus}`} onClick={decrementCount}>-</button>
      <button className={`${styles.button} ${styles.plus}`} onClick={incrementCount}>+</button>
    </div>
  );
}
