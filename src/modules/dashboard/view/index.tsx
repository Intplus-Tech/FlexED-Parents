"use client";

import Header from "../components/header";
import StudentCards from "../components/student-card";
import PaymentTable from "../components/table/dashboard-table";
import {
  useGetParentDashboardQuery,
  useGetParentTransactionQuery,
  useGetParentProfileQuery,
} from "@/redux/api/parents";
import { StudentDashboard } from "@/@types/parents";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: dashbaord, isFetching, isLoading } = useGetParentDashboardQuery();
  const {
    data: paymentData,
    isFetching: isPaymentFetching,
    isLoading: isPaymentLoading,
  } = useGetParentTransactionQuery({ limit: 10 });
  const { data: profileData } = useGetParentProfileQuery();
  const router = useRouter();

  const handlePayNow = (student: StudentDashboard) => {
    router.push(`/pay-fees?studentId=${student.id}`);
  };

  const totalOutstanding =
    dashbaord?.data?.students.reduce(
      (sum, student) => sum + student.totalOutstanding,
      0,
    ) || 0;

  return (
    <div className="min-h-screen">
      <div className="mt-6">
        <Header
          studentCount={dashbaord?.data?.students?.length || 0}
          totalOutstanding={totalOutstanding}
          currentTermStatus={totalOutstanding > 0 ? "Outstanding" : "Paid"}
          isLoading={isLoading || isFetching}
          parentFirstName={profileData?.data?.parent?.firstName}
        />

        <div className="mt-12">
          <StudentCards
            students={dashbaord?.data?.students || []}
            onPayNow={handlePayNow}
            isLoading={isLoading || isFetching}
          />
        </div>

        <div className="mt-12">
          <PaymentTable
            payments={paymentData?.data?.rows || []}
            isLoading={isPaymentLoading || isPaymentFetching}
          />
        </div>
      </div>
    </div>
  );
}
