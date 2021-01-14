import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { getOrderList, getUser } from '../api'
import { Orders } from '../ContextTypes'
const Cookies = require('js-cookie')


interface OrdersList {
    orders: Orders[],
}
interface OrderProp { }
const OrderList: React.FC<OrderProp> = () => {
    const [ordersList, setOrdersList] = useState<OrdersList>()
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        const username = Cookies.get('username');
        setUsername(username === undefined ? "" : username)
        getOrderList(username).then((data) => {
            setOrdersList(data)
        })
    }, [])
    return (
        <motion.div
            initial={{ scaleY: .1 }}
            animate={{ scaleY: 1 }}
            transition={{ ease: "easeOut", duration: .2 }}
            className="orders"
        >
            {ordersList !== undefined && ordersList !== null && ordersList.orders !== undefined ?
                ordersList.orders.map((order, index) => (
                    <div key={index} className="orders-list">
                        <h3> • {order.artname}</h3>
                    </div>
                ))
                : <div >Empty</div>}
        </motion.div>
    )
}
export default OrderList
