"use server";

import OrderDB from "@/db/order";

// MOCK: Hardcoded Customer ID for testing "Logged In" state.
const TEST_CUSTOMER_EMAIL = "john.doe@example.com"; 

export async function getOrders() {
    const orders = await OrderDB.findByCustomerEmail(TEST_CUSTOMER_EMAIL);
    
    // Serializing Decimal to Number/String to avoid passing complex objects to client
    return orders.map(order => ({
        ...order,
        totalPrice: Number(order.totalPrice),
        subtotal: Number(order.subtotal),
        taxTotal: Number(order.taxTotal),
        shippingTotal: Number(order.shippingTotal),
        items: order.items.map(item => ({
            ...item,
            price: Number(item.price)
        }))
    }));
}
