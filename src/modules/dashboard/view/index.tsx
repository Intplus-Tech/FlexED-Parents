"use client";

import { useEffect, useState } from "react";
import {
  mockStudentFees,
  mockDashboardData,
  mockStudents,
} from "@/lib/mock-data";
import { StudentIcon } from "@/icons";
import DashbaordLoader from "../loader";
import Link from "next/link";
import DashbaordMetrics from "../components/dashbaord-metrics";
import { StudentFees } from "../components/student-fee";

interface StudentFee {
  studentId: string;
  studentName: string;
  class: string;
  totalTermFee: string;
  amountPaid: string;
  balanceRemaining: string;
  dueDate: string;
  status: string;
}

export default function DashboardView() {
  const [fees, setFees] = useState<StudentFee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setFees(mockStudentFees);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const mockFees = [
    {
      studentId: "1",
      studentName: "Chiamaka Adebayo",
      class: "SSS 2",
      totalTermFee: "₦180,000",
      amountPaid: "₦150,000",
      balanceRemaining: "₦30,000",
      dueDate: "Sept 24, 2024",
      status: "pending" as const,
      image: "/student-male-avatar.jpg",
    },
    {
      studentId: "2",
      studentName: "Aisha Mohammed",
      class: "SSS 1",
      totalTermFee: "₦180,000",
      amountPaid: "₦150,000",
      balanceRemaining: "₦30,000",
      dueDate: "Sept 24, 2024",
      status: "pending" as const,
      image: "/student-female-avatar.jpg",
    },
    {
      studentId: "3",
      studentName: "Chiamaka Adebayo",
      class: "JSS 2",
      totalTermFee: "₦180,000",
      amountPaid: "₦180,000",
      balanceRemaining: "₦0",
      dueDate: "Sept 24, 2024",
      status: "paid" as const,
      image: "/student-male-avatar.jpg",
    },
  ];
  if (isLoading) {
    return <DashbaordLoader />;
  }

  return (
    <div className="">
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <p className=" text-[#54536E] font-normal">First Term 2024/2025</p>
            <span>Current Term</span>
          </div>
          <div>
            <p className="text-red-500">5%</p>
            <p className="text-sm text-gray-600">Early Bird Discount</p>
          </div>

          <div className="">
            <p className=" text-[#54536E] font-normal">
              {mockDashboardData.dueDate}
            </p>
            <p className="text-sm text-gray-600">Fee Due Date</p>
          </div>
        </div>

        <div className="text-right">
          <Link
            href="#"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            View All Payment History
          </Link>
        </div>
      </div>

      <DashbaordMetrics />

      {/* Student Fee Cards */}
      <StudentFees fees={mockFees} />
    </div>
  );
}
