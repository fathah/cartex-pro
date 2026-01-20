"use client";

import { Form, Input, Radio, Button, Select } from "antd";
import { Plus, MapPin } from "lucide-react";
import { useState } from "react";
import AddAddressModal from "./add-address-modal";

interface DeliveryAddressProps {
    customer: any;
    addresses: any[];
    selectedAddressId: string | null;
    setSelectedAddressId: (id: string) => void;
}

export default function DeliveryAddress({ 
    customer, 
    addresses, 
    selectedAddressId, 
    setSelectedAddressId 
}: DeliveryAddressProps) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="mb-10">
            <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
            
            {/* Logged in with Addresses */}
            {customer ? (
                <div className="flex flex-col gap-4">
                    <div className="mb-2">
                        {addresses.length > 0 ? (
                            <Radio.Group 
                                className="w-full grid grid-cols-1 md:grid-cols-2 gap-4" 
                                value={selectedAddressId} 
                                onChange={(e) => setSelectedAddressId(e.target.value)}
                            >
                                {addresses.map((addr) => (
                                    <div 
                                        key={addr.id} 
                                        className={`
                                            border rounded-xl p-4 cursor-pointer hover:border-[#003d29] relative
                                            ${selectedAddressId === addr.id ? 'border-[#003d29] bg-green-50/30' : 'border-gray-200'}
                                        `}
                                        onClick={() => setSelectedAddressId(addr.id)}
                                    >
                                        <Radio value={addr.id} className="w-full">
                                            <div className="flex items-start gap-3 w-full pl-2">
                                                <MapPin size={18} className="mt-1 text-gray-500" />
                                                <div>
                                                    <div className="font-semibold">{addr.firstName} {addr.lastName}</div>
                                                    <div className="text-sm text-gray-600">
                                                        {addr.address1}
                                                        {addr.address2 && `, ${addr.address2}`}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {addr.city}, {addr.zip}, {addr.country}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">{addr.phone}</div>
                                                </div>
                                            </div>
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        ) : (
                            <p className="text-gray-500 text-sm">No saved addresses.</p>
                        )}
                        
                        <Button 
                            type="dashed" 
                            icon={<Plus size={16} />} 
                            className="mt-4 w-full h-12"
                            onClick={() => setModalOpen(true)}
                        >
                            Add New Address
                        </Button>
                    </div>

                    <AddAddressModal 
                        customerId={customer.id} 
                        open={modalOpen} 
                        onCancel={() => setModalOpen(false)}
                        onSuccess={() => setModalOpen(false)}
                    />
                </div>
            ) : (
                // Guest Form
                 <>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="fullName"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input size="large" placeholder="John Doe" className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input size="large" placeholder="john@example.com" className="rounded-lg" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="phone"
                        label="Phone number"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input 
                            size="large" 
                            addonBefore={
                                 <Select defaultValue="+1" style={{ width: 80 }} className="select-before">
                                    <Select.Option value="+1">🇺🇸 +1</Select.Option>
                                    <Select.Option value="+44">🇬🇧 +44</Select.Option>
                                    <Select.Option value="+62">🇮🇩 +62</Select.Option>
                                </Select>
                            } 
                            placeholder="888 999 1222" 
                            className="rounded-lg" 
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="address"
                        label="Address"
                        className="mb-0"
                    >
                        <Input.TextArea rows={3} placeholder="123 Main St, Appt 4B" className="rounded-lg" />
                    </Form.Item>
                </>
            )}
        </section>
    );
}
