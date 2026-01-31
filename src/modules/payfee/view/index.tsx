"use client";

import { useState, useEffect } from "react";
import { mockPaymentSummary, mockBankDetails } from "@/lib/mock-data";
import Link from "next/link";
import { BackIcon, BankIcon, CardIcon } from "@/icons";
import PayFeeLoader from "../loader";
import PaymentSummaryModal from "../components/pay-summary";
import { useMakePaymentMutation } from "@/redux/api/parents";
import {useGetParentDashboardQuery} from "@/redux/api/parents"; 
// import {paymentSettingSchema} from "@/lib/validation";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import { useCountdown } from "@/hooks/use-countdown-timer";
import { useDVAStorage } from "@/hooks/use-dva-storage";
import { DVAPaymentContent, DVAPaymentModal } from "../components/dva-payment-modal";


export default function PayFeesView() {

 const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { dvaDetails, isLoading, saveDVA, clearDVA } = useDVAStorage();
  
  const countdownState = useCountdown(dvaDetails?.expires_at || '', () => {
    // Clear data when timer expires
    clearDVA();
  });



  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Open modal on desktop when DVA is available
  useEffect(() => {
    if (dvaDetails && !isMobile && !countdownState.isExpired) {
      setIsModalOpen(true);
    }
  }, [dvaDetails, isMobile, countdownState.isExpired]);

 

const currentUser = useSelector((state:RootState)=>state.authState.currentUser)
  const { data, isLoading:isParentDashboardLoading} = useGetParentDashboardQuery()
const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();


  
  const handlePayment = async () => {
  
    if (!data?.data) return;
  

  try {
    const response = await makePayment({
   
      studentIds: data?.data?.students.map(student => student.id) || [],
      paymentItemIds: data?.data?.students.flatMap(student => student.items).map(item => item.paymentItemId),
      email: String(currentUser?.email),
     duration: 600, // e.g., 10 minutes
    }).unwrap();

    saveDVA(response?.data?.dva || null);

    console.log("Payment response:", response);
    // Squad redirect
   
  } catch (error) {
    console.error("Payment failed", error);
    alert("Payment failed. Please try again.");
  }
};

  console.log("data:", data);

  return (
    // <div className="">
    //   <div className="mb-8 flex items-center space-x-3">
    //     <h1 className="text-3xl font-bold text-gray-900">Payment Summary</h1>
    //   </div>

    //   <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-4 mb-6">
    //       <div className="flex items-center justify-center text-center">
    //         <button
    //           onClick={() => setIsModalOpen(true)}
    //           className="text-purple-500  underline  font-medium text-sm text-center"
    //         >
    //           View Details
    //         </button>
    //       </div>

    //       {mockPaymentSummary.Chiamaka.map((payment, idx) => (
    //         <div key={idx} className="text-center">
    //           <p className="text-sm text-gray-600 mb-1">{payment.name}</p>
    //           <p className="font-bold text-[#6E6B97]">{payment.amount}</p>
    //         </div>
    //       ))}

    //       {mockPaymentSummary.other.map((payment, idx) => (
    //         <div key={`other-${idx}`} className="text-center">
    //           <p className="text-sm text-gray-600 mb-1">{payment.name}</p>
    //           <p className="font-bold text-[#6E6B97]">{payment.amount}</p>
    //         </div>
    //       ))}

    //       <div className="">
    //         <div className="flex flex-col justify-between items-center">
    //           <span className="text-gray-700">Total Payable</span>
    //           <span className="text-2xl font-bold text-red-600">
    //             {mockPaymentSummary.total}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Payment Methods */}
    //   <div className="mb-8">
    //     <h2 className="text-lg font-semibold text-gray-900 mb-4">
    //       Pay Now with one of the below Payment Method
    //     </h2>

    //     <div className="space-y-4">
    //       {/* Bank Transfer Option */}
    //       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    //         <button
    //           onClick={() => {
    //             setSelectedMethod("transfer");
    //             setExpandedMethod(
    //               expandedMethod === "transfer" ? null : "transfer"
    //             );
    //           }}
    //           className="w-full p-6 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
    //         >
    //           <input
    //             type="radio"
    //             checked={selectedMethod === "transfer"}
    //             onChange={() => setSelectedMethod("transfer")}
    //             className="w-5 h-5 accent-purple-600"
    //           />
    //           <BankIcon className="w-6 h-6 text-gray-600" />
    //           <span className="text-lg font-medium text-gray-900">
    //             Pay With Transfer
    //           </span>
    //         </button>

    //         {/* Expandable Details */}
    //         {expandedMethod === "transfer" && (
    //           <div className="border-t border-gray-200  p-6 space-y-6 animate-in">
    //             <div className=" flex gap-4">
    //               <p className="text-sm text-gray-600 mb-2">Account Name:</p>
    //               <p className="font-semibold text-gray-900">
    //                 {mockBankDetails.accountName}
    //               </p>
    //             </div>
    //             <div className=" flex gap-4">
    //               <p className="text-sm text-gray-600 mb-2">Bank Name:</p>
    //               <p className="font-semibold text-gray-900">
    //                 {mockBankDetails.bankName}
    //               </p>
    //             </div>
    //             <div className=" flex gap-4">
    //               <p className="text-sm text-gray-600 mb-2">Account Number:</p>
    //               <p className="font-semibold text-gray-900">
    //                 {mockBankDetails.accountNumber}
    //               </p>
    //             </div>
    //           </div>
    //         )}
    //       </div>

    //       {/* Card Payment Option */}
    //       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    //         <button
    //           onClick={() => {
    //             setSelectedMethod("card");
    //             setExpandedMethod(expandedMethod === "card" ? null : "card");
    //           }}
    //           className="w-full p-6 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
    //         >
    //           <input
    //             type="radio"
    //             checked={selectedMethod === "card"}
    //             onChange={() => setSelectedMethod("card")}
    //             className="w-5 h-5 accent-purple-600"
    //           />
    //           <CardIcon className="w-6 h-6 text-gray-600" />
    //           <span className="text-lg font-medium text-gray-900">
    //             Pay With Card
    //           </span>
    //         </button>

    //         {expandedMethod === "card" && (
    //           <div className="border-t border-gray-200 bg-gray-50 p-6 animate-in">
    //             <p className="text-gray-600 text-center py-4">
    //               Card payment gateway will be integrated here
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <PaymentSummaryModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //   />
    // </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {data?.data?.students?.map((student) => (
    <div key={student.id} className="p-4 border rounded-lg bg-white shadow-sm">
      <p className="font-bold border-b pb-2 mb-2">
        {student.firstName} {student.lastName}
      </p>
      
      <div className="text-gray-600 mb-4">
        {student.items?.map((item, idx) => (
          <div className="flex justify-between" key={idx}>
            <span>{item.name}:</span>  
            <span>₦{item.amount?.toLocaleString()}</span>   
          </div>
        ))}
      </div>

      <p className="text-red-600 font-bold text-sm">
        Total: ₦{student.totalOutstanding.toLocaleString()}
      </p>
    </div>
  ))}

      <button
        onClick={handlePayment} className="bg-purple-600 text-white px-3 py-1 rounded text-sm">
        { isPaying ? "Processing Payment..." : "Pay Now"} 
      </button>
      
        {isMobile && dvaDetails && (
        <div className="container max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Payment Instructions
            </h1>
            <p className="text-sm text-muted-foreground">
              Virtual Account Transfer
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
              <h2 className="text-lg font-bold text-primary-foreground">
                Payment Details
              </h2>
            </div>
            <div className="p-6">
              <DVAPaymentContent
                dvaDetails={dvaDetails}
                isExpired={countdownState.isExpired}
                isModal={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Modal */}
      <DVAPaymentModal
        dvaDetails={dvaDetails}
        isOpen={isModalOpen && !isMobile}
        onClose={() => setIsModalOpen(false)}
        isExpired={countdownState.isExpired}
      />
</div>
 );
}
