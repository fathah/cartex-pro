'use server';

import { ShippingDB } from '@/db/shipping';
import { ShippingRateType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const REVALIDATE_PATH = '/admin/settings';

// --- Zones ---

export async function getShippingZones() {
    return await ShippingDB.listZones();
}

export async function getShippingMethodsForAddress(country: string, state?: string) {
    const zone = await ShippingDB.findZoneForAddress(country, state);
    if (!zone) return [];
    
    // Return methods with their rates
    // Logic for figuring out the exact rate cost (e.g. weight based) could happen here or client side.
    // For now, passing back the raw methods with rates.
    return zone.methods;
}

export async function createShippingZone(name: string, areas: { country: string; state: string }[]) {
    const zone = await ShippingDB.createZone({ name, areas });
    revalidatePath(REVALIDATE_PATH);
    return zone;
}

export async function updateShippingZone(id: string, data: { name?: string; areas?: { country: string; state: string }[] }) {
    const zone = await ShippingDB.updateZone(id, data);
    revalidatePath(REVALIDATE_PATH);
    return zone;
}

export async function deleteShippingZone(id: string) {
    await ShippingDB.deleteZone(id);
    revalidatePath(REVALIDATE_PATH);
}

// --- Methods ---

export async function createShippingMethod(zoneId: string, data: { name: string; code: string; description?: string }) {
    const method = await ShippingDB.createMethod(zoneId, data);
    revalidatePath(REVALIDATE_PATH);
    return method;
}

export async function deleteShippingMethod(id: string) {
    await ShippingDB.deleteMethod(id);
    revalidatePath(REVALIDATE_PATH);
}

// --- Rates ---

export async function addShippingRate(methodId: string, data: { 
    type: ShippingRateType; 
    price: number; 
    min?: number; 
    max?: number; 
}) {
    const rate = await ShippingDB.addRate(methodId, data);
    revalidatePath(REVALIDATE_PATH);
    return rate;
}

export async function updateShippingRate(id: string, data: { price?: number; min?: number; max?: number, isActive?: boolean }) {
    const rate = await ShippingDB.updateRate(id, data);
    revalidatePath(REVALIDATE_PATH);
    return rate;
}

export async function deleteShippingRate(id: string) {
    await ShippingDB.deleteRate(id);
    revalidatePath(REVALIDATE_PATH);
}
