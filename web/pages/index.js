import Head from 'next/head'
import Inventory from '../components/Inventory'
import Transaction from '../components/Transaction'
import VendingMachine from '../components/VendingMachine'
import Wallet from '../components/Wallet'
import { useVendingMachine } from '../hooks/useVendingMachine'
import styles from '../styles/Home.module.css'

export default function Home () {
  const {
    vMachineInventory,
    setVMachineInventory,
    customerInventory,
    customerWallet,
    setCustomerWallet,
    transactionWallet,
    setTransactionWallet
  } = useVendingMachine()

  return (
    <div className={styles.container}>
      <Head>
        <title>Vending Machine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1>🧑‍🚀 Vending Machine 🚀</h1>
      </div>
      <div className={styles.content}>
        <VendingMachine inventory={vMachineInventory} setInventory={setVMachineInventory} />
        <Wallet wallet={customerWallet} transactionWallet={transactionWallet} setTransactionWallet={setTransactionWallet} />
        <Transaction transactionWallet={transactionWallet} vMachineInventory={vMachineInventory} />
        <Inventory inventory={customerInventory} />
      </div>
    </div>
  )
}
