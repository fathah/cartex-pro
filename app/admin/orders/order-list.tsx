"use client";

import React, { useState } from 'react';
import { Table, Input, Badge, Button, Tabs, Card, Tag, Space } from 'antd';
import { Search, Eye, MoreHorizontal, FileText } from 'lucide-react';
import Link from 'next/link';
import Currency from '@/components/common/Currency';

interface OrderListProps {
  initialOrders: any[];
  initialTotal: number;
  stats: any;
}

export default function OrderList({ initialOrders, initialTotal, stats }: OrderListProps) {
  const [orders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Order',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text: number) => <span className="font-medium">#{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_: any, record: any) => (
        <div>
            <div className="font-medium">{record.customer?.firstName} {record.customer?.lastName}</div>
            <div className="text-xs text-gray-400">{record.customer?.email}</div>
        </div>
      )
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => {
        const color = status === 'PAID' ? 'green' : status === 'PENDING' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Fulfillment',
      dataIndex: 'fulfillmentStatus',
      key: 'fulfillmentStatus',
      render: (status: string) => {
        const color = status === 'FULFILLED' ? 'green' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Items',
      key: 'items',
      render: (_: any, record: any) => `${record.items.length} items`,
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => <Currency value={price} className="font-medium" />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
             <button className="text-gray-400 hover:text-gray-600">
                 <FileText size={18} />
             </button>
             <button className="text-gray-400 hover:text-gray-600">
                 <MoreHorizontal size={18} />
             </button>
        </Space>
      ),
    },
  ];

  const StatCard = ({ title, value, change, trend }: any) => (
      <Card bordered={false} className="shadow-sm">
          <div className="text-gray-500 text-sm mb-2">{title}</div>
          <div className="text-2xl font-bold mb-2">{value}</div>
          <div className={`text-xs flex items-center gap-1 ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              <span>{change}</span>
              <span className="text-gray-400">last week</span>
          </div>
      </Card>
  );

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-2">
            <Button>Export</Button>
            <Button type="primary">Create order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <StatCard title="Total Orders" value={stats.total} change="25.2%" trend="up" />
         <StatCard title="Order items over time" value="15" change="18.2%" trend="up" />
         <StatCard title="Returns Orders" value={stats.returns} change="-1.2%" trend="down" />
         <StatCard title="Fulfilled orders over time" value={stats.fulfilled} change="12.2%" trend="up" />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
         <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Tabs defaultActiveKey="all" items={[
                { key: 'all', label: 'All' },
                { key: 'unfulfilled', label: 'Unfulfilled' },
                { key: 'unpaid', label: 'Unpaid' },
                { key: 'open', label: 'Open' },
                { key: 'closed', label: 'Closed' },
            ]} className="mb-0" />
            
            <div className="flex gap-2">
                 <Input prefix={<Search size={16} />} placeholder="Search" className="w-64" />
                 <Button>Filter</Button>
            </div>
         </div>
         <Table 
            columns={columns} 
            dataSource={orders} 
            rowKey="id"
            pagination={{ total: initialTotal }}
            loading={loading}
         />
      </div>
    </div>
  );
}
