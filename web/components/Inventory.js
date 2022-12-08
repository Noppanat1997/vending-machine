import styles from './Inventory.module.css'
import Item from './Item'

export default function Inventory ({ inventory }) {
  return (
    <div className={styles.container}>
      <p className={styles.header}>My Inventory</p>
      <div className={styles.content}>
        <div className={styles.box}>
          {inventory?.map((item) => <Item key={item.item_id} mode="inventory" item={item} />)}
        </div>
      </div>
    </div>
  );
}
