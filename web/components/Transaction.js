import { useEffect } from 'react'
import styles from './Transaction.module.css'

export default function Transaction ({ transactionWallet, vMachineInventory }) {

  const getTotal = () => {
    const toBuyItem = vMachineInventory.filter((item) => item.selectedAmount > 0)
    return toBuyItem.reduce((acc, cur) => acc += (cur.selectedAmount * cur.price), 0)
  }

  const getAmount = () => {
    return (transactionWallet.c1 * 1) +
      (transactionWallet.c5 * 5) +
      (transactionWallet.c10 * 10) +
      (transactionWallet.c20 * 20) +
      (transactionWallet.c50 * 50) +
      (transactionWallet.c100 * 100) +
      (transactionWallet.c500 * 500) +
      (transactionWallet.c1000 * 1000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <p>Total</p>
        <input value={`${vMachineInventory && getTotal()} THB`} disabled />
      </div>
      <div className={styles.inputContainer}>
        <p>Amount</p>
        <input value={`${transactionWallet && getAmount()} THB`} disabled />
      </div>
      <div className={styles.submitContainer}>
        <button>Cancel</button>
        <button disabled={vMachineInventory && transactionWallet && getTotal() >= getAmount() || getTotal() === 0}>Purchase</button>
      </div>
    </div>
  );
}
