import React from "react";
import { HeaderSkeleton } from "../skeleton-loader/skeleton-loader";
import { useRouter } from "next/navigation";
import { Users, Wallet, BadgeCheck, ArrowRight } from "lucide-react";

interface HeaderProps {
  studentCount: number;
  totalOutstanding: number;
  currentTermStatus: string;
  isLoading: boolean;
  parentFirstName?: string;
}

export default function Header({
  studentCount,
  totalOutstanding,
  currentTermStatus,
  isLoading,
  parentFirstName,
}: HeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const router = useRouter();

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  const isFullyPaid = totalOutstanding === 0;

  return (
    <div className="bg-linear-to-br from-[#702DFF] to-[#5A1FE0] rounded-3xl px-6 py-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {parentFirstName ? `Welcome back, ${parentFirstName}` : "Welcome back"}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Here&apos;s an overview of your children&apos;s fees
          </p>
        </div>

        {!isFullyPaid && (
          <button
            onClick={() => router.push("/pay-fees")}
            className="inline-flex items-center gap-2 bg-white text-[#702DFF] px-5 py-3 rounded-xl font-semibold hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Pay Outstanding Fees
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
            <Users className="w-4 h-4" />
            My Students
          </div>
          <p className="text-3xl font-bold mt-2">{studentCount}</p>
        </div>

        <div className="bg-white/95 text-gray-700 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Wallet className="w-4 h-4" />
            Total Outstanding
          </div>
          <p
            className={`text-2xl font-bold mt-2 ${
              isFullyPaid ? "text-green-600" : "text-red-500"
            }`}
          >
            {formatCurrency(totalOutstanding)}
          </p>
        </div>

        <div className="bg-white/95 text-gray-700 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <BadgeCheck className="w-4 h-4" />
            Current Term Status
          </div>
          <p
            className={`text-2xl font-bold mt-2 uppercase ${
              isFullyPaid ? "text-green-600" : "text-orange-500"
            }`}
          >
            {currentTermStatus}
          </p>
        </div>
      </div>
    </div>
  );
}
