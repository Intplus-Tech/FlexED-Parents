export const mockStudents = [
  {
    id: "1",
    name: "Chiamaka Adebayo",
    class: "SSS 3",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chiamaka",
  },
  {
    id: "2",
    name: "Aisha Mohammed",
    class: "SSS 1",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: "3",
    name: "Chinedu Johnson",
    class: "SSS 2",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu",
  },
];

export const mockDashboardData = {
  term: "First Term 2024/2025",
  earlyBirdDiscount: "5%",
  dueDate: "September 24, 2024",
  totalStudents: 3,
  totalOutstanding: "₦4,750,000",
  currentTermFeeStatus: "₦0 (100%)",
};

export const mockStudentFees = [
  {
    studentId: "1",
    studentName: "Chiamaka Adebayo",
    class: "SSS 2",
    totalTermFee: "₦180,000",
    amountPaid: "₦150,000",
    balanceRemaining: "₦30,000",
    dueDate: "Sept 24, 2024",
    status: "pending",
  },
  {
    studentId: "2",
    studentName: "Aisha Mohammed",
    class: "SSS 1",
    totalTermFee: "₦180,000",
    amountPaid: "₦150,000",
    balanceRemaining: "₦30,000",
    dueDate: "Sept 24, 2024",
    status: "pending",
  },
  {
    studentId: "3",
    studentName: "Chinedu Johnson",
    class: "SSS 2",
    totalTermFee: "₦180,000",
    amountPaid: "₦180,000",
    balanceRemaining: "₦0",
    dueDate: "Sept 24, 2024",
    status: "paid",
  },
];

export const mockPaymentSummary = {
  Chiamaka: [
    { name: "Chiamaka Adebayo", amount: "₦750,000" },
    { name: "Chiamaka Adebayo", amount: "₦750,000" },
  ],
  other: [
    { name: "Aisha Mohammed", amount: "₦750,000" },
    { name: "Musa Mohammed", amount: "₦750,000" },
  ],
  total: "₦4,750,000",
};

export const mockBankDetails = {
  accountName: "Sactum College, Lagos",
  bankName: "Guarantee Trust Bank",
  accountNumber: "0001231230",
};
