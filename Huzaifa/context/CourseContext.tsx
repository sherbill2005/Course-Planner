"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course, CourseSession, User } from "../lib/types";
import { AVAILABLE_COURSES } from "../lib/dummyData";
import { useAuth } from "./AuthContext";

interface CourseContextType {
  enrolledCourses: Course[];
  addCourse: (courseId: string) => { success: boolean; message: string };
  removeCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      const savedEnrolledIds = user.enrolledCourseIds || [];
      const courses = AVAILABLE_COURSES.filter((c) => savedEnrolledIds.includes(c.id));
      setEnrolledCourses(courses);
    } else {
      setEnrolledCourses([]);
    }
  }, [user]);

  const checkClash = (newCourse: Course): { hasClash: boolean; clashingCourse?: string } => {
    for (const enrolled of enrolledCourses) {
      for (const enrolledSession of enrolled.sessions) {
        for (const newSession of newCourse.sessions) {
          if (enrolledSession.day === newSession.day) {
            const start1 = enrolledSession.startTime;
            const end1 = enrolledSession.endTime;
            const start2 = newSession.startTime;
            const end2 = newSession.endTime;

            // Check if intervals [start1, end1] and [start2, end2] overlap
            if (start1 < end2 && start2 < end1) {
              return { hasClash: true, clashingCourse: enrolled.title };
            }
          }
        }
      }
    }
    return { hasClash: false };
  };

  const addCourse = (courseId: string): { success: boolean; message: string } => {
    const courseToAdd = AVAILABLE_COURSES.find((c) => c.id === courseId);
    if (!courseToAdd) return { success: false, message: "Course not found" };

    if (enrolledCourses.find((c) => c.id === courseId)) {
      return { success: false, message: "Already enrolled in this course" };
    }

    const clash = checkClash(courseToAdd);
    if (clash.hasClash) {
      return { success: false, message: `Clash detected with ${clash.clashingCourse}` };
    }

    const updatedCourses = [...enrolledCourses, courseToAdd];
    setEnrolledCourses(updatedCourses);
    updateUserEnrollment(updatedCourses.map(c => c.id));
    return { success: true, message: "Successfully enrolled" };
  };

  const removeCourse = (courseId: string) => {
    const updatedCourses = enrolledCourses.filter((c) => c.id !== courseId);
    setEnrolledCourses(updatedCourses);
    updateUserEnrollment(updatedCourses.map(c => c.id));
  };

  const updateUserEnrollment = (courseIds: string[]) => {
    if (!user) return;
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) => 
      u.id === user.id ? { ...u, enrolledCourseIds: courseIds } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current user session as well
    const updatedCurrentUser = { ...user, enrolledCourseIds: courseIds };
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
  };

  return (
    <CourseContext.Provider value={{ enrolledCourses, addCourse, removeCourse }}>
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
