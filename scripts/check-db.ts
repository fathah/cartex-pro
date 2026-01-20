
import SettingsDB from '../db/settings';
import UserDB from '../db/user';
import ProductDB from '../db/product';

async function main() {
  console.log("Checking DB connections...");

  // 1. Settings
  console.log("1. Init Settings...");
  const settings = await SettingsDB.get();
  console.log("Settings:", settings.storeName);

  // 2. User
  console.log("\n2. Create User...");
  const email = `test-${Date.now()}@example.com`;
  const user = await UserDB.create({
    email,
    passwordHash: "dummyhash",
    firstName: "Test",
    lastName: "Admin"
  });
  console.log("User created:", user.id);

  // 3. Product
  console.log("\n3. Create Product...");
  const slug = `test-product-${Date.now()}`;
  const product = await ProductDB.create({
      name: "Test Product",
      slug: slug,
      status: "DRAFT"
  });
  console.log("Product created:", product.id);

  console.log("\nDone!");
}

main().catch(console.error);
