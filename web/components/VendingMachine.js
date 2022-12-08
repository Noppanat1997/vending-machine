import styles from './VendingMachine.module.css'
import Item from './Item'
import { useEffect } from 'react'

export default function VendingMachine ({ inventory, setInventory }) {

  const onSelectedItem = (itemId, selectedAmount) => {
    const updatedIndex = inventory.findIndex((item) => item.item_id === itemId)
    const updatedInventory = [...inventory]
    updatedInventory[updatedIndex].selectedAmount = selectedAmount
    setInventory(updatedInventory)
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>Vending Machine</p>
      <div className={styles.content}>
        {inventory?.map((item) => <Item key={item.item_id} mode="vendingMachine" item={item} onSelectedItem={onSelectedItem} />)}
      </div>
    </div>
  );
}
