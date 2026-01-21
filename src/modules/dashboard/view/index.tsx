"use client";

import { Payment, Student } from "@/@types/dashboard";
import { useState } from "react";
import Header from "../components/header";
import StudentCards from "../components/student-card";
import PaymentTable from "../components/table/dashboard-table";
import PaymentModal from "../components/payment-modal";

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Chiamaka Adebayo",
    class: "SSS 2",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    termFee: 180000,
    amountPaid: 150000,
    balanceDue: 30000,
  },
  {
    id: 2,
    name: "Chiamaka Adebayo",
    class: "SSS 2",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    termFee: 180000,
    amountPaid: 150000,
    balanceDue: 30000,
  },
  {
    id: 3,
    name: "Chiamaka Adebayo",
    class: "SSS 2",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    termFee: 180000,
    amountPaid: 150000,
    balanceDue: 30000,
  },
];

const mockPayments: Payment[] = [
  {
    id: 1,
    time: "2:34pm",
    transactionId: "23353213",
    studentName: "Chiamaka Adebayo",
    class: "SSS 3",
    amountPaid: 150000,
    percentageRemaining: 75,
    status: "Successful",
  },
  {
    id: 2,
    time: "2:34pm",
    transactionId: "62889208",
    studentName: "Aisha Mohammed",
    class: "JSS 1",
    amountPaid: 150000,
    percentageRemaining: 25,
    status: "Failed",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayNow = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const totalOutstanding = mockStudents.reduce(
    (sum, student) => sum + student.balanceDue,
    0,
  );
  const currentTermStatus = mockStudents.filter(
    (s) => s.balanceDue === 0,
  ).length;

  return (
    <div className="min-h-screen ">
      <div className="mt-6">
        {/* <div className="mb-6 flex gap-3">
          <button
            onClick={handleLoadingDemo}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Loading..." : "Demo Loading State"}
          </button>
        </div> */}

        <Header
          studentCount={mockStudents.length}
          totalOutstanding={totalOutstanding}
          currentTermStatus={currentTermStatus}
          isLoading={isLoading}
        />

        <div className="mt-12">
          <StudentCards
            students={mockStudents}
            onPayNow={handlePayNow}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-12">
          <PaymentTable payments={mockPayments} isLoading={isLoading} />
        </div>
      </div>

      {selectedStudent && (
        <PaymentModal
          isOpen={isModalOpen}
          student={selectedStudent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
