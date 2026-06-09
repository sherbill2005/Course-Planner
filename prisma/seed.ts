import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding courses...");
  
  const coursesData = [
    // Fall 2023 - Semester 1
    {
      courseCode: "CE119",
      title: "Computing Fundamentals",
      instructor: "Dr. Ahmed",
      credits: 3,
      semester: 1,
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
    },
    {
      courseCode: "CE119L",
      title: "Computing Fundamentals Lab",
      instructor: "Engr. Sarah",
      credits: 1,
      semester: 1,
      day: "Monday",
      startTime: "10:30",
      endTime: "12:00",
    },
    {
      courseCode: "CE125",
      title: "Computer Engineering Workshop Lab",
      instructor: "Engr. Bilal",
      credits: 1,
      semester: 1,
      day: "Tuesday",
      startTime: "09:00",
      endTime: "11:00",
    },
    {
      courseCode: "CE129",
      title: "Occupational Health and Safety",
      instructor: "Dr. Fatima",
      credits: 1,
      semester: 1,
      day: "Wednesday",
      startTime: "09:00",
      endTime: "10:30",
    },
    {
      courseCode: "HS101",
      title: "Islamic Studies",
      instructor: "Prof. Hassan",
      credits: 2,
      semester: 1,
      day: "Wednesday",
      startTime: "10:30",
      endTime: "12:00",
    },
    {
      courseCode: "HS119",
      title: "Functional English",
      instructor: "Ms. Zainab",
      credits: 2,
      semester: 1,
      day: "Thursday",
      startTime: "09:00",
      endTime: "10:30",
    },
    {
      courseCode: "MS103",
      title: "Calculus and Analytical Geometry",
      instructor: "Dr. Usman",
      credits: 3,
      semester: 1,
      day: "Thursday",
      startTime: "10:30",
      endTime: "12:00",
    },
    {
      courseCode: "MS112L",
      title: "Applied Physics Lab",
      instructor: "Engr. Ali",
      credits: 1,
      semester: 1,
      day: "Friday",
      startTime: "09:00",
      endTime: "11:00",
    },
    {
      courseCode: "MS112T",
      title: "Applied Physics",
      instructor: "Dr. Kamran",
      credits: 2,
      semester: 1,
      day: "Friday",
      startTime: "11:00",
      endTime: "12:30",
    },

    // Spring 2024 - Semester 2
    {
      courseCode: "CE116L",
      title: "Computer Programming Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
      day: "Monday",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      courseCode: "CE116T",
      title: "Computer Programming Theory",
      instructor: "TBA",
      credits: 3,
      semester: 2,
      day: "Monday",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      courseCode: "EE122L",
      title: "Circuit Analysis Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
      day: "Tuesday",
      startTime: "11:00",
      endTime: "13:00",
    },
    {
      courseCode: "EE122T",
      title: "Circuit Analysis",
      instructor: "TBA",
      credits: 3,
      semester: 2,
      day: "Tuesday",
      startTime: "13:00",
      endTime: "14:30",
    },
    {
      courseCode: "EE125T",
      title: "Electronic Devices and Circuit",
      instructor: "TBA",
      credits: 3,
      semester: 2,
      day: "Wednesday",
      startTime: "12:00",
      endTime: "13:30",
    },
    {
      courseCode: "EE125L",
      title: "Electronic Devices and Circuit Lab",
      instructor: "TBA",
      credits: 1,
      semester: 2,
      day: "Wednesday",
      startTime: "13:30",
      endTime: "15:30",
    },
    {
      courseCode: "HS127",
      title: "Pakistan Studies and Aligarh Movement",
      instructor: "TBA",
      credits: 2,
      semester: 2,
      day: "Thursday",
      startTime: "12:00",
      endTime: "13:30",
    },
    {
      courseCode: "HS223",
      title: "Communication Skills",
      instructor: "TBA",
      credits: 2,
      semester: 2,
      day: "Thursday",
      startTime: "13:30",
      endTime: "15:00",
    },
    {
      courseCode: "MS109",
      title: "Linear Algebra",
      instructor: "TBA",
      credits: 3,
      semester: 2,
      day: "Friday",
      startTime: "12:30",
      endTime: "14:00",
    },

    // Fall 2024 - Semester 3
    {
      courseCode: "CE215L",
      title: "Digital Logic Design Lab",
      instructor: "TBA",
      credits: 1,
      semester: 3,
      day: "Monday",
      startTime: "15:30",
      endTime: "17:30",
    },
    {
      courseCode: "CE215T",
      title: "Digital Logic Design",
      instructor: "TBA",
      credits: 3,
      semester: 3,
      day: "Tuesday",
      startTime: "14:30",
      endTime: "16:00",
    },
    {
      courseCode: "CE216",
      title: "Discrete Structures",
      instructor: "TBA",
      credits: 3,
      semester: 3,
      day: "Wednesday",
      startTime: "15:30",
      endTime: "17:00",
    },
    {
      courseCode: "CE225L",
      title: "Object Oriented Programming Lab",
      instructor: "TBA",
      credits: 1,
      semester: 3,
      day: "Thursday",
      startTime: "15:00",
      endTime: "17:00",
    },
    {
      courseCode: "CE225T",
      title: "Object Oriented Programming",
      instructor: "TBA",
      credits: 3,
      semester: 3,
      day: "Friday",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      courseCode: "HS401",
      title: "Technical Report Writing",
      instructor: "TBA",
      credits: 2,
      semester: 3,
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      courseCode: "MS202",
      title: "Complex Variables and Integral Transforms",
      instructor: "TBA",
      credits: 3,
      semester: 3,
      day: "Tuesday",
      startTime: "08:00",
      endTime: "09:00",
    },

    // Spring 2025 - Semester 4
    {
      courseCode: "CE202T",
      title: "Software Engineering Lab",
      instructor: "TBA",
      credits: 4,
      semester: 4,
      day: "Wednesday",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      courseCode: "CE205L",
      title: "Data Structures and Algorithms Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
      day: "Thursday",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      courseCode: "CE205T",
      title: "Data Structures and Algorithms",
      instructor: "TBA",
      credits: 3,
      semester: 4,
      day: "Friday",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      courseCode: "CE207L",
      title: "Computer Organization and Architecture Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
      day: "Monday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseCode: "CE207T",
      title: "Computer Organization and Architecture Theory",
      instructor: "TBA",
      credits: 3,
      semester: 4,
      day: "Tuesday",
      startTime: "10:00",
      endTime: "11:30",
    },
    {
      courseCode: "CE220L",
      title: "Signals and Systems Lab",
      instructor: "TBA",
      credits: 1,
      semester: 4,
      day: "Wednesday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseCode: "CE220T",
      title: "Signals and Systems",
      instructor: "TBA",
      credits: 3,
      semester: 4,
      day: "Thursday",
      startTime: "10:00",
      endTime: "11:30",
    },
    {
      courseCode: "MS215",
      title: "Differential Equations",
      instructor: "TBA",
      credits: 2,
      semester: 4,
      day: "Friday",
      startTime: "10:00",
      endTime: "11:30",
    },

    // Fall 2025 - Semester 5
    {
      courseCode: "CE303L",
      title: "Operating Systems Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
      day: "Monday",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      courseCode: "CE303T",
      title: "Operating Systems",
      instructor: "TBA",
      credits: 3,
      semester: 5,
      day: "Tuesday",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      courseCode: "CE318L",
      title: "Microprocessors and Interfacing Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
      day: "Wednesday",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      courseCode: "CE318T",
      title: "Microprocessors and Interfacing",
      instructor: "TBA",
      credits: 3,
      semester: 5,
      day: "Thursday",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      courseCode: "CE320",
      title: "Digital Signal Processing",
      instructor: "TBA",
      credits: 3,
      semester: 5,
      day: "Friday",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      courseCode: "CE320L",
      title: "Digital Signal Processing Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
      day: "Monday",
      startTime: "16:00",
      endTime: "18:00",
    },
    {
      courseCode: "CE321L",
      title: "Computer Communication and Networks Lab",
      instructor: "TBA",
      credits: 1,
      semester: 5,
      day: "Tuesday",
      startTime: "16:00",
      endTime: "18:00",
    },
    {
      courseCode: "CE321T",
      title: "Computer Communication and Networks",
      instructor: "TBA",
      credits: 3,
      semester: 5,
      day: "Wednesday",
      startTime: "16:00",
      endTime: "17:30",
    },
    {
      courseCode: "HS301",
      title: "Engineering Economics",
      instructor: "TBA",
      credits: 2,
      semester: 5,
      day: "Thursday",
      startTime: "16:00",
      endTime: "17:30",
    },
  ];

  for (const course of coursesData) {
    await prisma.course.upsert({
      where: { courseCode: course.courseCode },
      update: course,
      create: course,
    });
  }

  console.log("Courses seeded/updated successfully");

  // Seed Prerequisites
  console.log("Seeding prerequisites...");
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
