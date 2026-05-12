export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface CourseSession {
  day: Day;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  credits: number;
  sessions: CourseSession[];
}

export interface User {
  id: number;
  fullName: string;
  studentId: string;
}
