"use client";

import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { FolderOpen, ShoppingCart, DollarSign, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <Row gutter={16}>
            <Col span={6}>
            <Card bordered={false}>
                <Statistic
                title="Total Sales"
                value={112893}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarSign size={18} />}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false}>
                <Statistic
                title="Orders"
                value={93}
                prefix={<ShoppingCart size={18} />}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false}>
                <Statistic
                title="Products"
                value={12}
                prefix={<FolderOpen size={18} />}
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false}>
                <Statistic
                title="Active Users"
                value={4}
                prefix={<Users size={18} />}
                />
            </Card>
            </Col>
        </Row>
    </div>
  );
}
