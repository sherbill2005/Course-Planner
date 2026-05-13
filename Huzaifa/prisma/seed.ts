import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { AVAILABLE_COURSES } from "../lib/dummyData";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding courses...");

  for (const course of AVAILABLE_COURSES) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        credits: course.credits,
        sessions: {
          create: course.sessions.map((session) => ({
            day: session.day,
            startTime: session.startTime,
            endTime: session.endTime,
          })),
        },
      },
    });
    console.log(`Added course: ${course.title}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });