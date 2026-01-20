"use server";

import AddressDB, { CreateAddressData } from "@/db/address";
import CustomerDB from "@/db/customer";
import { revalidatePath } from "next/cache";

// MOCK: Hardcoded Customer ID for testing "Logged In" state.
const TEST_CUSTOMER_EMAIL = "john.doe@example.com"; 

async function getCustomerId() {
    const customer = await CustomerDB.findByEmail(TEST_CUSTOMER_EMAIL);
    if (!customer) {
        // Create if missing for testing
        return (await CustomerDB.create({
            firstName: "John",
            lastName: "Doe",
            email: TEST_CUSTOMER_EMAIL,
            isGuest: false
        })).id;
    }
    return customer.id;
}

export async function getAddresses() {
    const customerId = await getCustomerId();
    return await AddressDB.listByCustomer(customerId);
}

export async function addAddress(formData: FormData) {
    const customerId = await getCustomerId();
    
    const data: CreateAddressData = {
        customerId,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        address1: formData.get("address1") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        phone: formData.get("phone") as string,
        // Optional fields
        address2: formData.get("address2") as string || undefined,
        type: "SHIPPING" // Default
    };

    if (!data.address1 || !data.city || !data.country || !data.firstName) {
        throw new Error("Missing required fields");
    }

    await AddressDB.create(data);
    revalidatePath("/account/addresses");
}

export async function deleteAddress(id: string) {
    await AddressDB.delete(id);
    revalidatePath("/account/addresses");
}

export async function updateAddress(id: string, formData: FormData) {
    const data: Partial<CreateAddressData> = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        address1: formData.get("address1") as string,
        city: formData.get("city") as string,
        country: formData.get("country") as string,
        phone: formData.get("phone") as string,
        address2: formData.get("address2") as string || undefined,
    };

    // Filter out undefined/empty values if needed, or rely on form validation
    // For now assuming the form sends all fields again
    
    await AddressDB.update(id, data);
    revalidatePath("/account/addresses");
}
