"use client";

import { Form, Radio } from "antd";
import { Truck, Loader2 } from "lucide-react";
import Currency from "../../../../components/common/Currency";

interface ShippingMethodsProps {
    loading: boolean;
    shippingMethods: any[];
}

export default function ShippingMethods({ loading, shippingMethods }: ShippingMethodsProps) {
    
    const getMethodPrice = (method: any) => {
        const rate = method.rates?.[0];
        if (!rate) return "Calculated at next step";
        if (rate.type === 'FLAT' || rate.type === 'PRICE') {
            return Number(rate.price) === 0 ? "Free" : <Currency value={rate.price} />;
        }
        return "Calculated";
    };

    return (
        <section className="mb-10">
            <h2 className="text-xl font-bold mb-6">Shipping Services</h2>
            
            {loading ? (
                <div className="text-center py-6 text-gray-500 flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Loading rates...
                </div>
            ) : shippingMethods.length === 0 ? (
                <div className="p-4 bg-orange-50 text-orange-600 rounded-lg text-sm border border-orange-100">
                    No shipping methods available for this location.
                </div>
            ) : (
                <Form.Item name="shippingService" rules={[{ required: true, message: 'Please select a shipping method' }]} className="mb-0">
                    <Radio.Group className="w-full flex flex-col gap-4">
                        {shippingMethods.map((method) => (
                            <div 
                                key={method.id}
                                className="border border-gray-200 rounded-xl p-4 flex items-center shadow-sm hover:border-[#003d29] transition-colors cursor-pointer relative"
                            >
                                <Radio value={method.code} className="w-full">
                                    <div className="flex justify-between items-center w-full pl-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600">
                                                <Truck size={16} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">{method.name}</div>
                                                <div className="text-xs text-gray-500">{method.description || 'Standard Delivery'}</div>
                                            </div>
                                        </div>
                                        <span className="font-medium text-sm">{getMethodPrice(method)}</span>
                                    </div>
                                </Radio>
                            </div>
                        ))}
                    </Radio.Group>
                </Form.Item>
            )}
        </section>
    );
}