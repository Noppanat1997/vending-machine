import { useEffect, useState } from 'react';
import styles from './Credit.module.css'
import PlusMinus from './PlusMinus'

export default function Credit ({
  name,
  credit,
  onSelectedCredit
}) {
  let [count, setCount] = useState(0);
  let [total, setTotal] = useState(0);

  const incrementCount = () => {
    if (count < credit) {
      count = count + 1;
      total = total - 1;
    }
    setCount(count);
    setTotal(total);
  }

  const decrementCount = () => {
    if (count !== 0) {
      count = count - 1;
      total = total + 1;
      setCount(count);
      setTotal(total);
    }
  }

  useEffect(() => {
    setTotal(credit)
  }, [credit])

  useEffect(() => {
    onSelectedCredit(name, count)
  }, [count])

  return (
    <div className={styles.container}>
      {count > 0 ? <div className={styles.selectedAmount}>
        x{count}
      </div> : null}
      <div className={styles.content}>
        <p className={styles.name}>{name.substring(1)}</p>
        <p className={styles.amount}>Total: {total}</p>
        <PlusMinus
          defaultCount={0}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
        />
      </div>
    </div>
  )
}
