"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "../lib/types";
import { useAuth } from "./AuthContext";

interface CourseContextType {
  availableCourses: Course[];
  enrolledCourses: Course[];
  loading: boolean;
  addCourse: (courseId: string) => Promise<{ success: boolean; message: string }>;
  removeCourse: (courseId: string) => Promise<{ success: boolean; message: string }>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();

      if (response.ok) {
        setAvailableCourses(data);
      } else {
        console.error("Courses fetch failed:", data.error);
      }
    } catch (error) {
      console.error("Courses fetch error:", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      if (!user?.id) {
        setEnrolledCourses([]);
        return;
      }

      const response = await fetch(`/api/enrollments?userId=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setEnrolledCourses(data);
      } else {
        console.error("Enrolled courses fetch failed:", data.error);
      }
    } catch (error) {
      console.error("Enrolled courses fetch error:", error);
    }
  };

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);

      await fetchAvailableCourses();

      if (user?.id) {
        await fetchEnrolledCourses();
      } else {
        setEnrolledCourses([]);
      }

      setLoading(false);
    }

    loadCourses();
  }, [user]);

  const addCourse = async (
    courseId: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!user?.id) {
      return {
        success: false,
        message: "Please login first",
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
          courseId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.error || "Failed to enroll course",
        };
      }

      if (data.course) {
        setEnrolledCourses((prev) => {
          const alreadyExists = prev.some(
            (course) => course.id === data.course.id
          );

          if (alreadyExists) {
            return prev;
          }

          return [...prev, data.course];
        });
      } else {
        await fetchEnrolledCourses();
      }

      return {
        success: true,
        message: data.message || "Successfully enrolled",
      };
    } catch (error) {
      console.error("Add course error:", error);

      return {
        success: false,
        message: "Something went wrong while enrolling course",
      };
    }
  };

  const removeCourse = async (
    courseId: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!user?.id) {
      return {
        success: false,
        message: "Please login first",
      };
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          courseId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.error || "Failed to remove course",
        };
      }

      setEnrolledCourses((prev) =>
        prev.filter((course) => course.id !== courseId)
      );

      return {
        success: true,
        message: data.message || "Course removed successfully",
      };
    } catch (error) {
      console.error("Remove course error:", error);

      return {
        success: false,
        message: "Something went wrong while removing course",
      };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        availableCourses,
        enrolledCourses,
        loading,
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
    throw new Error("useCourses must be used within CourseProvider");
  }

  return context;
};