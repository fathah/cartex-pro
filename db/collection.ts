import prisma from './prisma';

export default class CollectionDB {
  static async create(name: string, slug: string, description?: string, imageId?: string) {
    return await prisma.collection.create({
      data: {
        name,
        slug,
        description,
        imageId,
      },
    });
  }

  static async list() {
    return await prisma.collection.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  static async findBySlug(slug: string) {
    return await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
            where: { deletedAt: null, status: 'ACTIVE' },
            take: 20
        },
      },
    });
  }
  static async update(id: string, data: { name?: string, slug?: string, description?: string, imageId?: string }) {
    return await prisma.collection.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.collection.delete({
      where: { id },
    });
  }
}
