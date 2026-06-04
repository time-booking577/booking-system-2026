-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "businessName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "hairCutPrice" INTEGER NOT NULL,
    "makeupPrice" INTEGER NOT NULL,
    "nailsPrice" INTEGER NOT NULL,
    "notifications" BOOLEAN NOT NULL DEFAULT true
);
