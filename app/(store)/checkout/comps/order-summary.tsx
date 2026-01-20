"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button, Input, Divider } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function OrderSummary() {
    const { items, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        useCartStore.persist.rehydrate();
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // Placeholder logic for shipping/tax
    const shipping = 15.00; 
    const taxes = subtotal * 0.05; // 5% tax
    const total = subtotal + shipping + taxes;

    return (
        <div className="bg-gray-50 p-8 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Summary</h2>

            {/* Cart Items */}
            <div className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={item.key} className="flex gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 border border-gray-200 overflow-hidden relative">
                             {item.image ? (
                                <img src={item.image} alt={item.name} className="object-cover w-full h-full mix-blend-multiply" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {item.variantTitle && <span>{item.variantTitle}</span>}
                                {item.variantTitle && <span className="mx-1">•</span>}
                                <span>Qty: {item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Divider />

            {/* Calculations */}
            <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-black mt-2 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Do you have a promotional code?</p>
                <div className="flex gap-2">
                    <Input placeholder="Enter code" size="large" className="rounded-lg" />
                    <Button size="large" className="bg-black text-white px-6 hover:!bg-gray-800 border-black rounded-lg">
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
}
