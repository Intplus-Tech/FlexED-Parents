"use client";

import { Payment, Student } from "@/@types/dashboard";
import { useState } from "react";
import Header from "../components/header";
import StudentCards from "../components/student-card";
import PaymentTable from "../components/table/dashboard-table";
import PaymentModal from "../components/payment-modal";
import { useGetParentDashboardQuery, useGetParentTransactionQuery } from "@/redux/api/parents";
import { StudentDashboard } from "@/@types/parents";



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
  const { data: dashbaord, isFetching,isLoading } = useGetParentDashboardQuery();
 const {data:paymentData, isFetching:isPaymentFetching,isLoading:isPaymentLoading} = useGetParentTransactionQuery({limit:10});
  const [selectedStudent, setSelectedStudent] =
    useState<StudentDashboard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayNow = (student: StudentDashboard) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

 

  const totalOutstanding =
    dashbaord?.data?.students.reduce(
      (sum, student) => sum + student.totalOutstanding,
      0,
    ) || 0;



  return (
    <div className="min-h-screen ">
      <div className="mt-6">
        <Header
          studentCount={dashbaord?.data?.students?.length || 0}
          totalOutstanding={totalOutstanding}
          // currentTermStatus={dashbaord?.data?.currentTermStatus || 0}
          isLoading={isLoading||isFetching}
        />

        <div className="mt-12">
          <StudentCards
            students={dashbaord?.data?.students || []}
            onPayNow={handlePayNow}
            isLoading={isLoading||isFetching}
          />
        </div>

        <div className="mt-12">
          <PaymentTable payments={paymentData?.data?.rows || []} isLoading={isPaymentLoading||isPaymentFetching} />
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
