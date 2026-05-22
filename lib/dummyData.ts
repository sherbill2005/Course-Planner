import { Course } from "./types";

export const AVAILABLE_COURSES: Course[] = [
  {
    id: "CS101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Smith",
    credits: 3,
    sessions: [
      { day: "Monday", startTime: "09:00", endTime: "10:30" },
      { day: "Wednesday", startTime: "09:00", endTime: "10:30" },
    ],
  },
  {
    id: "MATH201",
    title: "Calculus II",
    instructor: "Prof. Johnson",
    credits: 4,
    sessions: [
      { day: "Tuesday", startTime: "10:00", endTime: "12:00" },
      { day: "Thursday", startTime: "10:00", endTime: "12:00" },
    ],
  },
  {
    id: "ENG102",
    title: "English Composition",
    instructor: "Ms. Davis",
    credits: 3,
    sessions: [
      { day: "Monday", startTime: "11:00", endTime: "12:30" },
      { day: "Friday", startTime: "11:00", endTime: "12:30" },
    ],
  },
  {
    id: "PHY101",
    title: "General Physics I",
    instructor: "Dr. Brown",
    credits: 4,
    sessions: [
      { day: "Wednesday", startTime: "14:00", endTime: "16:00" },
      { day: "Friday", startTime: "14:00", endTime: "16:00" },
    ],
  },
  {
    id: "ART101",
    title: "History of Art",
    instructor: "Prof. Wilson",
    credits: 2,
    sessions: [
      { day: "Tuesday", startTime: "14:00", endTime: "15:30" },
    ],
  },
  {
    id: "CS202",
    title: "Data Structures",
    instructor: "Dr. Lee",
    credits: 3,
    sessions: [
      { day: "Monday", startTime: "10:00", endTime: "11:30" }, // Potential clash with CS101/ENG102
      { day: "Thursday", startTime: "14:00", endTime: "15:30" },
    ],
  },
];
