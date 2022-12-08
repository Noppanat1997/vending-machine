import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './Item.module.css'
import PlusMinus from './PlusMinus'

export default function Item ({
  mode,
  item,
  onSelectedItem
}) {
  let [count, setCount] = useState(0);
  let [total, setTotal] = useState(0);

  const incrementCount = () => {
    if (count < item.amount) {
      count = count + 1;
      total = total - 1;
      setCount(count);
      setTotal(total);
    }
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
    setTotal(item.amount)
  }, [item.amount])

  useEffect(() => {
    if (mode !== "inventory") {
      onSelectedItem(item.item_id, count)
    }
  }, [count])

  return (
    <div className={styles.container}>
      {count > 0 ? <div className={styles.selectedAmount}>
        x{count}
      </div> : null}
      <div className={styles.content}>
        {mode !== "vendingMachine" ? <div className={styles.selectedAmount}>x{item.amount}</div> : null}
        <Image src={`/${item.name}.png`} alt="Coca Cola" width={100} height={100} />
        <p className={styles.name}>{item.name}</p>
        {mode !== "inventory" ? <p className={styles.price}>{item.price} THB</p> : null}
        {mode !== "inventory" ? <p className={styles.amount}>Total: {total}</p> : null}
        {
          mode !== "inventory" ? <div>
            <PlusMinus
              defaultCount={0}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
            />
          </div> : null
        }
      </div>
    </div>
  )
}
