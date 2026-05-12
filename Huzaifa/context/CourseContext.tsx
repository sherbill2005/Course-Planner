"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course, CourseSession } from "../lib/types";
import { useAuth } from "./AuthContext";

type DatabaseCourse = {
  id: number;
  courseCode: string;
  title: string;
  instructor: string;
  credits: number;
  semester: number;
  day?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  prerequisites?: {
    prerequisiteCourse: DatabaseCourse;
  }[];
};

type EnrollmentWithCourse = {
  id: number;
  userId: number;
  courseId: number;
  status: string;
  createdAt: string;
  course: DatabaseCourse;
};

interface CourseContextType {
  enrolledCourses: Course[];
  addCourse: (courseId: string) => Promise<{ success: boolean; message: string }>;
  removeCourse: (courseId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const convertDbCourseToCourse = (course: DatabaseCourse): Course => {
  const sessions: CourseSession[] =
    course.day && course.startTime && course.endTime
      ? [
          {
            day: course.day as CourseSession["day"],
            startTime: course.startTime,
            endTime: course.endTime,
          },
        ]
      : [];

  return {
    id: String(course.id),
    title: course.title,
    instructor: course.instructor,
    credits: course.credits,
    sessions,
  };
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [availableDatabaseCourses, setAvailableDatabaseCourses] = useState<
    DatabaseCourse[]
  >([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: DatabaseCourse[] = await response.json();
        const convertedCourses = data.map(convertDbCourseToCourse);

        setAvailableDatabaseCourses(data);
        setAvailableCourses(convertedCourses);
      } catch (error) {
        console.log("COURSE_CONTEXT_FETCH_ERROR:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setEnrolledCourses([]);
        return;
      }

      try {
        const response = await fetch(`/api/enrollments?userId=${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const data: EnrollmentWithCourse[] = await response.json();

        const courses = data.map((enrollment) =>
          convertDbCourseToCourse(enrollment.course)
        );

        setEnrolledCourses(courses);
      } catch (error) {
        console.log("ENROLLMENTS_FETCH_ERROR:", error);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  const checkClash = (
    newCourse: Course
  ): { hasClash: boolean; clashingCourse?: string } => {
    for (const enrolled of enrolledCourses) {
      for (const enrolledSession of enrolled.sessions) {
        for (const newSession of newCourse.sessions) {
          if (enrolledSession.day === newSession.day) {
            const start1 = enrolledSession.startTime;
            const end1 = enrolledSession.endTime;
            const start2 = newSession.startTime;
            const end2 = newSession.endTime;

            if (start1 < end2 && start2 < end1) {
              return {
                hasClash: true,
                clashingCourse: enrolled.title,
              };
            }
          }
        }
      }
    }

    return { hasClash: false };
  };

  const addCourse = async (
    courseId: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: "Please login first" };
    }

    const courseToAdd = availableCourses.find(
      (course) => course.id === courseId
    );

    const databaseCourse = availableDatabaseCourses.find(
      (course) => String(course.id) === courseId
    );

    if (!courseToAdd || !databaseCourse) {
      return { success: false, message: "Course not found" };
    }

    if (enrolledCourses.find((course) => course.id === courseId)) {
      return { success: false, message: "Already enrolled in this course" };
    }

    if (
      databaseCourse.prerequisites &&
      databaseCourse.prerequisites.length > 0
    ) {
      const missingPrerequisites = databaseCourse.prerequisites.filter(
        (prereq) => {
          const prereqId = String(prereq.prerequisiteCourse.id);

          return !enrolledCourses.some(
            (enrolled) => enrolled.id === prereqId
          );
        }
      );

      if (missingPrerequisites.length > 0) {
        const missingNames = missingPrerequisites
          .map(
            (p) =>
              `${p.prerequisiteCourse.courseCode} - ${p.prerequisiteCourse.title}`
          )
          .join(", ");

        return {
          success: false,
          message: `Missing prerequisite: ${missingNames}`,
        };
      }
    }

    const clash = checkClash(courseToAdd);

    if (clash.hasClash) {
      return {
        success: false,
        message: `Clash detected with ${clash.clashingCourse}`,
      };
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: Number(courseId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to enroll course",
        };
      }

      setEnrolledCourses((prev) => [...prev, courseToAdd]);

      return { success: true, message: "Successfully enrolled" };
    } catch (error) {
      console.log("ADD_COURSE_ERROR:", error);
      return { success: false, message: "Failed to enroll course" };
    }
  };

  const removeCourse = async (courseId: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/enrollments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: Number(courseId),
        }),
      });

      if (!response.ok) {
        console.log("Failed to remove course");
        return;
      }

      setEnrolledCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.log("REMOVE_COURSE_ERROR:", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        enrolledCourses,
        addCourse,
        removeCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);

  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }

  return context;
};