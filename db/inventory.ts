import prisma from './prisma';

export default class InventoryDB {
  static async get(variantId: string) {
    return await prisma.inventory.findUnique({
      where: { variantId },
    });
  }

  static async update(variantId: string, quantity: number) {
    return await prisma.inventory.upsert({
      where: { variantId },
      create: { variantId, quantity: quantity },
      update: { quantity: quantity },
    });
  }

  static async adjust(variantId: string, adjustment: number) {
    return await prisma.inventory.update({
        where: { variantId },
        data: {
            quantity: { increment: adjustment }
        }
    });
  }
  
  static async reserve(variantId: string, amount: number) {
    // Check available logic?
    return await prisma.inventory.update({
        where: { variantId },
        data: {
            reserved: { increment: amount }
        }
    });
  }

  static async release(variantId: string, amount: number) {
     return await prisma.inventory.update({
        where: { variantId },
        data: {
            reserved: { decrement: amount }
        }
    });
  }
}
