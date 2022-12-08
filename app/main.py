from fastapi import FastAPI, HTTPException
from typing import List
from app.db import database
from pydantic import BaseModel

app = FastAPI(title="FastAPI, Docker, and Traefik")


class Credit(BaseModel):
    c1: int = 0
    c5: int = 0
    c10: int = 0
    c20: int = 0
    c50: int = 0
    c100: int = 0
    c500: int = 0
    c1000: int = 0


class Item(BaseModel):
    itemId: int = 0
    amount: int = 0
    price: int = None


class Transaction(BaseModel):
    credit: Credit
    items: List[Item]


@app.get("/wallet/{userId}")
async def getWallet(userId: int):
    query = "SELECT * FROM wallets WHERE user_id = :userId"
    return await database.fetch_one(query=query, values={"userId": userId})


@app.get("/inventory/{userId}")
async def getInventory(userId: int):
    query = """
        SELECT
            i.item_id,
            i.amount,
            it.name,
            it.price
        FROM
            inventories i
            INNER JOIN items it ON it.item_id = i.item_id
        WHERE
            user_id = :userId
    """
    return await database.fetch_all(query=query, values={"userId": userId})


def getCredit(amount: int):
    total = amount
    credit = Credit()
    if total//1000 >= 1:
        credit.c1000 = total//1000
        total = total % 1000
    if total//500 >= 1:
        credit.c500 = total//500
        total = total % 500
    if total//100 >= 1:
        credit.c100 = total//100
        total = total % 100
    if total//50 >= 1:
        credit.c50 = total//50
        total = total % 50
    if total//20 >= 1:
        credit.c20 = total//20
        total = total % 20
    if total//10 >= 1:
        credit.c10 = total//10
        total = total % 10
    if total//5 >= 1:
        credit.c5 = total//5
        total = total % 5
    if total//1 >= 1:
        credit.c1 = total//1
    return credit


def getTotalAmount(credit: Credit):
    return (credit.c1000 * 1000) + (credit.c500 * 500) + (credit.c100 * 100) + (credit.c50 * 50) + (credit.c20 * 20) + (credit.c10 * 10) + (credit.c5 * 5) + (credit.c1 * 1)


def getTotalPrice(items: List[Item]):
    totalPrice = 0
    for item in items:
        totalPrice += item.price
    return totalPrice


async def updateWallet(userId: int, credit: Credit):
    query = "UPDATE wallets SET c1=:c1, c5=:c5, c10=:c10, c20=:c20, c50=:c50, c100=:c100, c500=:c500, c1000=:c1000 WHERE user_id=:userId"
    return await database.execute(query=query, values={
        "userId": userId,
        "c1": credit.c1,
        "c5": credit.c5,
        "c10": credit.c10,
        "c20": credit.c20,
        "c50": credit.c50,
        "c100": credit.c100,
        "c500": credit.c500,
        "c1000": credit.c1000,
    })


async def balanceWallet(senderId: int, recipientId: int, changeCredit: Credit):
    senderWallet = await getWallet(senderId)
    senderWallet.c1 -= changeCredit.c1
    senderWallet.c5 -= changeCredit.c5
    senderWallet.c10 -= changeCredit.c10
    senderWallet.c20 -= changeCredit.c20
    senderWallet.c50 -= changeCredit.c50
    senderWallet.c100 -= changeCredit.c100
    senderWallet.c500 -= changeCredit.c500
    senderWallet.c1000 -= changeCredit.c1000
    await updateWallet(senderId, senderWallet)
    recipientWallet = await getWallet(recipientId)
    recipientWallet.c1 += changeCredit.c1
    recipientWallet.c5 += changeCredit.c5
    recipientWallet.c10 += changeCredit.c10
    recipientWallet.c20 += changeCredit.c20
    recipientWallet.c50 += changeCredit.c50
    recipientWallet.c100 += changeCredit.c100
    recipientWallet.c500 += changeCredit.c500
    recipientWallet.c1000 += changeCredit.c1000
    await updateWallet(recipientId, recipientWallet)


async def updateInventory(userId: int, item: Item):
    print('[info] update inventory for userId=', userId, 'and item=', item)
    query = """
        UPDATE
            inventories
        SET
            amount = :amount
        WHERE
            user_id = :userId
            AND item_id = :itemId
    """
    await database.execute(query=query, values={
        "userId": userId,
        "itemId": item.itemId,
        "amount": item.amount
    })


async def createInventory(userId: int, item: Item):
    print('[info] create inventory for userId=', userId, 'and item=', item)
    query = """
        INSERT INTO
            inventories
            (user_id, item_id, amount)
        VALUES
            (:userId, :itemId, :amount)
    """
    await database.execute(query=query, values={
        "userId": userId,
        "itemId": item.itemId,
        "amount": item.amount
    })


async def balanceInventory(senderId: int, recipientId: int, items: List[Item]):
    senderInventory = await getInventory(senderId)
    for item in items:
        matchItem = [si for si in senderInventory if si.item_id == item.itemId]
        if len(matchItem) != 0:
            newItem = Item()
            newItem.itemId = matchItem[0].item_id
            newItem.amount = matchItem[0].amount - item.amount
            await updateInventory(senderId, newItem)
        else:
            await createInventory(senderId, item)

    recipientInventory = await getInventory(recipientId)
    for item in items:
        matchItem = [
            si for si in recipientInventory if si.item_id == item.itemId]
        if len(matchItem) != 0:
            newItem: Item = Item()
            newItem.itemId = matchItem[0].item_id
            newItem.amount = matchItem[0].amount + item.amount
            await updateInventory(recipientId, newItem)
        else:
            await createInventory(recipientId, item)


@app.post("/transaction/{senderId}/{recipientId}")
async def createTransaction(senderId: int, recipientId: int, transaction: Transaction):
    if senderId == recipientId:
        raise HTTPException(
            status_code=500, detail="Sender and Recipient should not be the same")
    if len(transaction.items) == 0:
        raise HTTPException(
            status_code=500, detail="Items should not be empty")
    itemsWithPrice = transaction.items
    for index, item in enumerate(transaction.items):
        query = "SELECT * FROM items WHERE item_id = :itemId"
        result = await database.fetch_one(query=query, values={"itemId": item.itemId})
        itemsWithPrice[index].price = result.price
    totalPrice = getTotalPrice(itemsWithPrice)
    totalAmount = getTotalAmount(transaction.credit)
    changeCredit = getCredit(totalAmount - totalPrice)
    await balanceWallet(senderId, recipientId, changeCredit)
    await balanceInventory(senderId, recipientId, itemsWithPrice)
    return {"senderId": senderId, "changeCredit": changeCredit}


@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()


@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()
