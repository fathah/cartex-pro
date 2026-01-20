"use client";

import { saveAddress } from "@/app/actions/checkout";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { useState } from "react";

interface AddAddressModalProps {
    customerId: string;
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function AddAddressModal({ customerId, open, onCancel, onSuccess }: AddAddressModalProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await saveAddress({
                customerId,
                firstName: values.firstName,
                lastName: values.lastName,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                country: values.country,
                zip: values.zip,
                phone: values.phone,
                type: 'SHIPPING'
            });
            message.success("Address saved");
            form.resetFields();
            onSuccess();
        } catch (error) {
            console.error(error);
            message.error("Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add New Address"
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ country: 'UAE' }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>
                
                <Form.Item name="address1" label="Address Line 1" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name="address2" label="Address Line 2 (Optional)">
                    <Input />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="city" label="City" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="zip" label="Zip Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                         <Select>
                            <Select.Option value="AE">United Arab Emirates</Select.Option>
                            
                         </Select>
                    </Form.Item>
                     <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading} className="bg-[#003d29]">Save Address</Button>
                </div>
            </Form>
        </Modal>
    );
}
