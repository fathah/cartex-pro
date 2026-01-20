"use client";

import React from 'react';
import { Search, ChevronDown, Package, MoreVertical, Star } from 'lucide-react';
import { Button } from 'antd';
import StoreHeader from '@/components/store/header';

const Account = () => {
  
    const orders = [
        {
            id: 'NAEI10090497170',
            status: 'Delivered',
            date: 'Thursday, 8th Jan, 04:07 PM',
            items: [
                {
                    name: 'Apple Pro Ammonia free Hair Color Dark Brown 500ml Pack of 2',
                    brand: 'Swift',
                    price: 45.00,
                    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop',
                    quantity: 1
                }
            ]
        },
        {
            id: 'NAEI10090497170',
            status: 'Delivered',
            date: 'Thursday, 8th Jan, 04:07 PM',
            items: [
                {
                    name: 'Apple Pro Ammonia free Hair Color Dark Brown 500ml Pack of 2',
                    brand: 'Swift',
                    price: 45.00,
                    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop',
                    quantity: 1
                }
            ]
        },
    ];

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

            {/* Controls */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Find items" 
                        className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
                    />
                </div>
                <button className="px-4 py-2.5 border rounded-md bg-white flex items-center gap-2 text-sm font-medium hover:bg-gray-50">
                    Last 3 months <ChevronDown size={16} />
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                <h3 className="font-bold text-gray-700 mt-6">Completed</h3>

                {orders.map((order, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        
                        {/* Order Header */}
                        <div className="p-4 border-b flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-md">
                                    <Package size={20} className="text-green-700" />
                                </div>
                                <span className="font-bold text-gray-800">{order.status} on {order.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1.5 rounded text-sm font-medium transition-colors">
                                    Rate Your Experience
                                </button>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                    <MoreVertical size={20} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">{item.brand}</p>
                                                <h4 className="font-medium text-gray-900 line-clamp-2 max-w-lg leading-snug">{item.name}</h4>
                                            </div>
                                            <div className="text-right">
                                                 <span className="font-bold block text-gray-900">${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Footer */}
                        <div className="px-4 py-3 bg-gray-50/50 border-t flex justify-end">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Order ID {order.id}</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-700 rounded-full"></span> Market
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;