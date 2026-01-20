'use server';

import { PaymentDB } from '@/db/payment';
import { PaymentMethodType, GatewayEnvironment } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const REVALIDATE_PATH = '/admin/settings';

// --- Methods ---

export async function getPaymentMethods() {
    return await PaymentDB.listMethods();
}

export async function createPaymentMethod(data: { name: string; code: string; type: PaymentMethodType; description?: string }) {
    const method = await PaymentDB.createMethod(data);
    revalidatePath(REVALIDATE_PATH);
    return method;
}

export async function updatePaymentMethod(id: string, data: { name?: string; description?: string; isActive?: boolean, gatewayIds?: string[] }) {
    const method = await PaymentDB.updateMethod(id, data);
    revalidatePath(REVALIDATE_PATH);
    return method;
}

export async function deletePaymentMethod(id: string) {
    await PaymentDB.deleteMethod(id);
    revalidatePath(REVALIDATE_PATH);
}

// --- Gateways ---

export async function getPaymentGateways() {
    return await PaymentDB.listGateways();
}

export async function createPaymentGateway(data: { name: string; code: string; environment: GatewayEnvironment; config: any }) {
    const gateway = await PaymentDB.createGateway(data);
    revalidatePath(REVALIDATE_PATH);
    return gateway;
}

export async function updatePaymentGateway(id: string, data: { name?: string; environment?: GatewayEnvironment; config?: any; isActive?: boolean }) {
    const gateway = await PaymentDB.updateGateway(id, data);
    revalidatePath(REVALIDATE_PATH);
    return gateway;
}

export async function deletePaymentGateway(id: string) {
    await PaymentDB.deleteGateway(id);
    revalidatePath(REVALIDATE_PATH);
}
