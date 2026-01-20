-- CreateEnum
CREATE TYPE "ShippingRateType" AS ENUM ('FLAT', 'CONDITIONAL', 'WEIGHT', 'PRICE');

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingRate" (
    "id" TEXT NOT NULL,
    "shippingMethodId" TEXT NOT NULL,
    "type" "ShippingRateType" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "minOrderAmount" DECIMAL(65,30),
    "maxOrderAmount" DECIMAL(65,30),
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShippingRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ShippingZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingZoneArea" (
    "id" TEXT NOT NULL,
    "shippingZoneId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT,
    "zipCode" TEXT,

    CONSTRAINT "ShippingZoneArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MethodZones" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MethodZones_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingMethod_code_key" ON "ShippingMethod"("code");

-- CreateIndex
CREATE INDEX "_MethodZones_B_index" ON "_MethodZones"("B");

-- AddForeignKey
ALTER TABLE "ShippingRate" ADD CONSTRAINT "ShippingRate_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "ShippingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingZoneArea" ADD CONSTRAINT "ShippingZoneArea_shippingZoneId_fkey" FOREIGN KEY ("shippingZoneId") REFERENCES "ShippingZone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodZones" ADD CONSTRAINT "_MethodZones_A_fkey" FOREIGN KEY ("A") REFERENCES "ShippingMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodZones" ADD CONSTRAINT "_MethodZones_B_fkey" FOREIGN KEY ("B") REFERENCES "ShippingZone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
