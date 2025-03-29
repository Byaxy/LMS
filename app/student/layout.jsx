"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "@/components/Footer/Footer";
import { Features, Courses, CourseBanner, HeritageBanner } from "@/components";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/student/Header";

export default function StudentLayout({ children }) {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasEnrollments, setHasEnrollments] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `/api/enrollments/user/${user.id}/courses`
          );
          setEnrollments(response.data.data);
          setHasEnrollments(response.data.data.length > 0);
        } catch (error) {
          console.error("Error fetching enrollments:", error);
          setHasEnrollments(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setHasEnrollments(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {user?.role === "student" && hasEnrollments ? (
          <>
            <CourseBanner enrollments={enrollments} />
            <Courses />
            <Features />
            {children}
          </>
        ) : (
          <>
            <HeritageBanner />
            <Courses />
            <Features />
          </>
        )}
      </main>
    </div>
  );
}
