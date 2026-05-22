import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.course.createMany({
  data: [
    // Fall 2023 - Semester 1
    {
      courseCode: "CE119",
      title: "Computing Fundamentals",
      instructor: "TBA",
      credits: 3,
      semester: 1,
    },
    {
      courseCode: "CE119L",
      title: "Computing Fundamentals Lab",
      instructor: "TBA",
      credits: 1,
      semester: 1,
    },
    {
      courseCode: "CE125",
      title: "Computer Engineering Workshop Lab",
      instructor: "TBA",
      credits: 1,
      semester: 1,
    },
    {
      courseCode: "CE129",
      title: "Occupational Health and Safety",
      instructor: "TBA",
      credits: 1,
      semester: 1,
    },
    {
      courseCode: "HS101",
      title: "Islamic Studies",
      instructor: "TBA",
      credits: 2,
      semester: 1,
    },
    {
      courseCode: "HS119",
      title: "Functional English",
      instructor: "TBA",
      credits: 2,
      semester: 1,
    },
    {
      courseCode: "MS103",
      title: "Calculus and Analytical Geometry",
      instructor: "TBA",
      credits: 3,
      semester: 1,
    },
    {
      courseCode: "MS112L",
      title: "Applied Physics Lab",
      instructor: "TBA",
      credits: 1,
      semester: 1,
    },
    {
      courseCode: "MS112T",
      title: "Applied Physics",
      instructor: "TBA",
      credits: 2,
      semester: 1,
    },

    // Spring 2024 - Semester 2
    {
      courseCode: "CE116L",
      title: "Computer Programming Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
    },
    {
      courseCode: "CE116T",
      title: "Computer Programming Theory",
      instructor: "TBA",
      credits: 3,
      semester: 2,
    },
    {
      courseCode: "EE122L",
      title: "Circuit Analysis Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
    },
    {
      courseCode: "EE122T",
      title: "Circuit Analysis",
      instructor: "TBA",
      credits: 3,
      semester: 2,
    },
    {
      courseCode: "EE125T",
      title: "Electronic Devices and Circuit",
      instructor: "TBA",
      credits: 3,
      semester: 2,
    },
    {
      courseCode: "EE125L",
      title: "Electronic Devices and Circuit Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
    },
    {
      courseCode: "HS127",
      title: "Pakistan Studies and Aligarh Movement",
      instructor: "TBA",
      credits: 2,
      semester: 2,
    },
    {
      courseCode: "HS223",
      title: "Communication Skills",
      instructor: "TBA",
      credits: 2,
      semester: 2,
    },
    {
      courseCode: "MS109",
      title: "Linear Algebra",
      instructor: "TBA",
      credits: 3,
      semester: 2,
    },

    // Fall 2024 - Semester 3
    {
      courseCode: "CE215L",
      title: "Digital Logic Design Lab",
      instructor: "TBA",
      credits: 1,
      semester: 3,
    },
    {
      courseCode: "CE215T",
      title: "Digital Logic Design",
      instructor: "TBA",
      credits: 3,
      semester: 3,
    },
    {
      courseCode: "CE216",
      title: "Discrete Structures",
      instructor: "TBA",
      credits: 3,
      semester: 3,
    },
    {
      courseCode: "CE225L",
      title: "Object Oriented Programming Lab",
      instructor: "TBA",
      credits: 1,
      semester: 3,
    },
    {
      courseCode: "CE225T",
      title: "Object Oriented Programming",
      instructor: "TBA",
      credits: 3,
      semester: 3,
    },
    {
      courseCode: "HS401",
      title: "Technical Report Writing",
      instructor: "TBA",
      credits: 2,
      semester: 3,
    },
    {
      courseCode: "MS202",
      title: "Complex Variables and Integral Transforms",
      instructor: "TBA",
      credits: 3,
      semester: 3,
    },

    // Spring 2025 - Semester 4
    {
      courseCode: "CE202T",
      title: "Software Engineering Lab",
      instructor: "TBA",
      credits: 4,
      semester: 4,
    },
    {
      courseCode: "CE205L",
      title: "Data Structures and Algorithms Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
    },
    {
      courseCode: "CE205T",
      title: "Data Structures and Algorithms",
      instructor: "TBA",
      credits: 3,
      semester: 4,
    },
    {
      courseCode: "CE207L",
      title: "Computer Organization and Architecture Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
    },
    {
      courseCode: "CE207T",
      title: "Computer Organization and Architecture Theory",
      instructor: "TBA",
      credits: 3,
      semester: 4,
    },
    {
      courseCode: "CE220L",
      title: "Signals and Systems Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
    },
    {
      courseCode: "CE220T",
      title: "Signals and Systems",
      instructor: "TBA",
      credits: 3,
      semester: 4,
    },
    {
      courseCode: "MS215",
      title: "Differential Equations",
      instructor: "TBA",
      credits: 2,
      semester: 4,
    },

    // Fall 2025 - Semester 5
    {
      courseCode: "CE303L",
      title: "Operating Systems Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
    },
    {
      courseCode: "CE303T",
      title: "Operating Systems",
      instructor: "TBA",
      credits: 3,
      semester: 5,
    },
    {
      courseCode: "CE318L",
      title: "Microprocessors and Interfacing Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
    },
    {
      courseCode: "CE318T",
      title: "Microprocessors and Interfacing",
      instructor: "TBA",
      credits: 3,
      semester: 5,
    },
    {
      courseCode: "CE320",
      title: "Digital Signal Processing",
      instructor: "TBA",
      credits: 3,
      semester: 5,
    },
    {
      courseCode: "CE320L",
      title: "Digital Signal Processing Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
    },
    {
      courseCode: "CE321L",
      title: "Computer Communication and Networks Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
    },
    {
      courseCode: "CE321T",
      title: "Computer Communication and Networks",
      instructor: "TBA",
      credits: 3,
      semester: 5,
    },
    {
      courseCode: "HS301",
      title: "Engineering Economics",
      instructor: "TBA",
      credits: 2,
      semester: 5,
    },
  ],
  skipDuplicates: true,
});
const ce116t = await prisma.course.findUnique({
  where: { courseCode: "CE116T" },
});

const ce225t = await prisma.course.findUnique({
  where: { courseCode: "CE225T" },
});

const ce205t = await prisma.course.findUnique({
  where: { courseCode: "CE205T" },
});

const ce303t = await prisma.course.findUnique({
  where: { courseCode: "CE303T" },
});

const ce321t = await prisma.course.findUnique({
  where: { courseCode: "CE321T" },
});

if (ce116t && ce225t) {
  await prisma.prerequisite.upsert({
    where: {
      courseId_prerequisiteCourseId: {
        courseId: ce225t.id,
        prerequisiteCourseId: ce116t.id,
      },
    },
    update: {},
    create: {
      courseId: ce225t.id,
      prerequisiteCourseId: ce116t.id,
    },
  });
}

if (ce225t && ce205t) {
  await prisma.prerequisite.upsert({
    where: {
      courseId_prerequisiteCourseId: {
        courseId: ce205t.id,
        prerequisiteCourseId: ce225t.id,
      },
    },
    update: {},
    create: {
      courseId: ce205t.id,
      prerequisiteCourseId: ce225t.id,
    },
  });
}

if (ce205t && ce303t) {
  await prisma.prerequisite.upsert({
    where: {
      courseId_prerequisiteCourseId: {
        courseId: ce303t.id,
        prerequisiteCourseId: ce205t.id,
      },
    },
    update: {},
    create: {
      courseId: ce303t.id,
      prerequisiteCourseId: ce205t.id,
    },
  });
}

if (ce303t && ce321t) {
  await prisma.prerequisite.upsert({
    where: {
      courseId_prerequisiteCourseId: {
        courseId: ce321t.id,
        prerequisiteCourseId: ce303t.id,
      },
    },
    update: {},
    create: {
      courseId: ce321t.id,
      prerequisiteCourseId: ce303t.id,
    },
  });
}

console.log("Prerequisites seeded successfully");
  console.log("Courses seeded successfully");

  // Seed Prerequisites
  const allCourses = await prisma.course.findMany();
  const getCourseId = (code: string) => allCourses.find((c) => c.courseCode === code)?.id;

  const prerequisitesData = [
    // CP requires CF
    { course: "CE116T", req: "CE119" },
    // OOP requires CP
    { course: "CE225T", req: "CE116T" },
    // DSA requires OOP
    { course: "CE205T", req: "CE225T" },
    // COA requires DLD
    { course: "CE207T", req: "CE215T" },
    // OS requires DSA
    { course: "CE303T", req: "CE205T" },
    // Microprocessors requires DLD
    { course: "CE318T", req: "CE215T" },
    // DSP requires Signals and Systems
    { course: "CE320", req: "CE220T" },
    // CCN requires CP
    { course: "CE321T", req: "CE116T" },
  ];

  for (const item of prerequisitesData) {
    const courseId = getCourseId(item.course);
    const prereqId = getCourseId(item.req);

    if (courseId && prereqId) {
      await prisma.prerequisite.upsert({
        where: {
          courseId_prerequisiteCourseId: {
            courseId: courseId,
            prerequisiteCourseId: prereqId,
          },
        },
        update: {},
        create: {
          courseId: courseId,
          prerequisiteCourseId: prereqId,
        },
      });
    }
  }

  console.log("Prerequisites seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });