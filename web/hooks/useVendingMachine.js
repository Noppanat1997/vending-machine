import { useState, useEffect } from 'react';

const mockVMachineInventory = [
  {
    "item_id": 1,
    "amount": 10,
    "name": "Coca Cola",
    "price": 22
  },
  {
    "item_id": 2,
    "amount": 10,
    "name": "Pepsi",
    "price": 22
  },
  {
    "item_id": 3,
    "amount": 10,
    "name": "Water",
    "price": 8
  },
  {
    "item_id": 4,
    "amount": 10,
    "name": "Red Bull",
    "price": 30
  },
  {
    "item_id": 5,
    "amount": 10,
    "name": "Fanta",
    "price": 18
  },
  {
    "item_id": 6,
    "amount": 10,
    "name": "Sprite",
    "price": 18
  },
  {
    "item_id": 7,
    "amount": 10,
    "name": "Sprite",
    "price": 18
  }
]

const mockCustomerInventory = [
  {
    "item_id": 1,
    "amount": 2,
    "name": "Coca Cola",
    "price": 22
  },
  {
    "item_id": 2,
    "amount": 1,
    "name": "Pepsi",
    "price": 22
  },
  {
    "item_id": 3,
    "amount": 2,
    "name": "Coca Cola",
    "price": 22
  },
  {
    "item_id": 4,
    "amount": 1,
    "name": "Pepsi",
    "price": 22
  }
]

const mockVMachineWallet = {
  "wallet_id": 1,
  "user_id": 1,
  "c1": 100,
  "c5": 100,
  "c10": 100,
  "c20": 100,
  "c50": 100,
  "c100": 100,
  "c500": 100,
  "c1000": 100
}

const mockCustomerWallet = {
  "wallet_id": 2,
  "user_id": 2,
  "c1": 10,
  "c5": 10,
  "c10": 10,
  "c20": 10,
  "c50": 10,
  "c100": 10,
  "c500": 10,
  "c1000": 10
}

export const useVendingMachine = () => {
  const [vMachineInventory, setVMachineInventory] = useState();
  const [customerInventory, setCustomerInventory] = useState();
  const [vMachineWallet, setVMachineWallet] = useState();
  const [customerWallet, setCustomerWallet] = useState();
  const [transactionWallet, setTransactionWallet] = useState({
    c1: 0,
    c5: 0,
    c10: 0,
    c20: 0,
    c50: 0,
    c100: 0,
    c500: 0,
    c1000: 0
  });

  useEffect(() => {
    setVMachineInventory(mockVMachineInventory)
    setCustomerInventory(mockCustomerInventory)
    setVMachineWallet(mockVMachineWallet)
    setCustomerWallet(mockCustomerWallet)
  }, []);

  return {
    vMachineInventory, setVMachineInventory,
    customerInventory, setCustomerInventory,
    vMachineWallet, setVMachineWallet,
    customerWallet, setCustomerWallet,
    transactionWallet, setTransactionWallet
  };
}
