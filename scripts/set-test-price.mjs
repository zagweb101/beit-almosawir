import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const slug = "photography-fundamentals";
const updated = await prisma.$executeRawUnsafe(
  `UPDATE "CourseOverride" SET "priceAmount"=5, currency='SAR', "priceLabel"='5 ريال (اختبار)', "updatedAt"=NOW() WHERE slug=$1`,
  slug,
);
if (updated === 0) {
  await prisma.$executeRawUnsafe(
    `INSERT INTO "CourseOverride" (slug,"priceAmount",currency,"priceLabel","updatedAt") VALUES ($1,5,'SAR','5 ريال (اختبار)',NOW())`,
    slug,
  );
}

const row = await prisma.$queryRawUnsafe(
  `SELECT slug,"priceAmount",currency,"priceLabel" FROM "CourseOverride" WHERE slug=$1`,
  slug,
);
console.log("تم ضبط السعر التجريبي:", JSON.stringify(row[0]));
await prisma.$disconnect();
