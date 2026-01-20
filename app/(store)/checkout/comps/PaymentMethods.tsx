"use client";

import { Form, Radio, Skeleton } from "antd";
import type { FormInstance } from "antd";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import { getPaymentMethods } from "@/app/actions/payment";

interface PaymentMethodsProps {
    form: FormInstance;
}

export default function PaymentMethods({ form }: PaymentMethodsProps) {
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [loadingPayment, setLoadingPayment] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('credit_card');

    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                const methods = await getPaymentMethods();
                // Filter only active methods
                const activeMethods = methods.filter((m: any) => m.isActive);
                setPaymentMethods(activeMethods);
                
                // Auto select first one
                if (activeMethods.length > 0) {
                    const defaultMethod = activeMethods[0].code;
                    form.setFieldValue('paymentMethod', defaultMethod);
                    setSelectedPaymentMethod(defaultMethod);
                }
            } catch (err) {
                console.error("Failed to load payment methods", err);
            } finally {
                setLoadingPayment(false);
            }
        };
        loadPaymentMethods();
    }, [form]);

    const getPaymentIcon = (type: string) => {
        switch (type) {
            case 'CARD': return <CreditCard size={20} className="text-blue-600" />;
            case 'COD': return <Banknote size={20} className="text-green-600" />;
            case 'WALLET': return <Wallet size={20} className="text-purple-600" />;
            default: return <CreditCard size={20} className="text-gray-600" />;
        }
    };

    return (
        <section className="mb-10">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                {loadingPayment ? (
                    <div className="space-y-4">
                        <Skeleton.Button active block size="large" className="h-16 w-full rounded-xl" />
                        <Skeleton.Button active block size="large" className="h-16 w-full rounded-xl" />
                    </div>
            ) : paymentMethods.length === 0 ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    No payment methods available.
                </div>
                ) : (
                    <Form.Item name="paymentMethod" className="mb-6">
                    <Radio.Group 
                        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        value={selectedPaymentMethod}
                    >
                        {paymentMethods.map((method) => (
                            <div 
                                key={method.id} 
                                className={`
                                    border rounded-xl p-4 flex items-center shadow-sm cursor-pointer transition-all
                                    ${selectedPaymentMethod === method.code 
                                        ? 'border-[#003d29] bg-[#f0fdf4]' 
                                        : 'border-gray-200 hover:border-[#003d29]'}
                                `}
                                onClick={() => {
                                    form.setFieldValue('paymentMethod', method.code);
                                    setSelectedPaymentMethod(method.code);
                                }}
                            >
                                <Radio value={method.code} className="w-full">
                                    <div className="flex items-center gap-3 w-full pl-2">
                                        {getPaymentIcon(method.type)}
                                        <span className="font-medium text-gray-900">{method.name}</span>
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