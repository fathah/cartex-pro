import prisma from './prisma';

export interface UpdateSettingsData {
  storeName?: string;
  logoUrl?: string;
  faviconUrl?: string;
  themeConfig?: any;
  currency?: string;
}

export default class SettingsDB {
  private static GLOBAL_ID = "global";

  /**
   * Get the global settings. If not found, create default settings.
   */
  static async get() {
    const settings = await prisma.settings.findUnique({
      where: { id: this.GLOBAL_ID },
    });

    if (!settings) {
      return await prisma.settings.create({
        data: {
          id: this.GLOBAL_ID,
          storeName: "My Store",
          currency: "USD",
          themeConfig: {},
        },
      });
    }

    return settings;
  }

  /**
   * Update global settings.
   */
  static async update(data: UpdateSettingsData) {
    // Ensure settings exist first
    await this.get();

    return await prisma.settings.update({
      where: { id: this.GLOBAL_ID },
      data,
    });
  }
}
