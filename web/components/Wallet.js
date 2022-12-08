import styles from './Wallet.module.css'
import Credit from './Credit'
import { useEffect } from 'react'

export default function Wallet ({ wallet, transactionWallet, setTransactionWallet }) {

  const onSelectedCredit = (name, selectedAmount) => {
    const updatedTransactionWallet = { ...transactionWallet }
    updatedTransactionWallet[name] = selectedAmount
    setTransactionWallet(() => updatedTransactionWallet)
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.header}>My Wallet</p>
        <div className={styles.total}>
          <p className={styles.totalHeader}>Total</p>
          <p className={styles.totalAmount}>{
            wallet && numberWithCommas(
              (wallet.c1 * 1) +
              (wallet.c5 * 5) +
              (wallet.c10 * 10) +
              (wallet.c20 * 20) +
              (wallet.c50 * 50) +
              (wallet.c100 * 100) +
              (wallet.c500 * 500) +
              (wallet.c1000 * 1000)
            )
          } THB</p>
        </div>
      </div>
      <div className={styles.content}>
        <Credit key='c1' name='c1' credit={wallet?.c1} onSelectedCredit={onSelectedCredit} />
        <Credit key='c5' name='c5' credit={wallet?.c5} onSelectedCredit={onSelectedCredit} />
        <Credit key='c10' name='c10' credit={wallet?.c10} onSelectedCredit={onSelectedCredit} />
        <Credit key='c20' name='c20' credit={wallet?.c20} onSelectedCredit={onSelectedCredit} />
        <Credit key='c50' name='c50' credit={wallet?.c50} onSelectedCredit={onSelectedCredit} />
        <Credit key='c100' name='c100' credit={wallet?.c100} onSelectedCredit={onSelectedCredit} />
        <Credit key='c500' name='c500' credit={wallet?.c500} onSelectedCredit={onSelectedCredit} />
        <Credit key='c1000' name='c1000' credit={wallet?.c1000} onSelectedCredit={onSelectedCredit} />
      </div>
    </div>
  );
}
