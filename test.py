senderInventory = [
    {
        "inventory_id": 1,
        "item_id": 1,
        "amount": 10,
        "name": "Coca Cola",
        "price": 22
    },
    {
        "inventory_id": 1,
        "item_id": 2,
        "amount": 10,
        "name": "Pepsi",
        "price": 22
    },
    {
        "inventory_id": 1,
        "item_id": 3,
        "amount": 10,
        "name": "Water",
        "price": 8
    },
    {
        "inventory_id": 1,
        "item_id": 4,
        "amount": 10,
        "name": "Red Bull",
        "price": 30
    },
    {
        "inventory_id": 1,
        "item_id": 5,
        "amount": 10,
        "name": "Fanta",
        "price": 18
    },
    {
        "inventory_id": 1,
        "item_id": 6,
        "amount": 10,
        "name": "Sprite",
        "price": 18
    }
]

test = [si for si in senderInventory if si.get('item_id') == 6]
print(test)
