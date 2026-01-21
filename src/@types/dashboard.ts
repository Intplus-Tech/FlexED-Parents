export interface Student {
  id: number;
  name: string;
  class: string;
  avatar: string;
  termFee: number;
  amountPaid: number;
  balanceDue: number;
}

export interface Payment {
  id: number;
  time: string;
  transactionId: string;
  studentName: string;
  class: string;
  amountPaid: number;
  percentageRemaining: number;
  status: "Successful" | "Failed" | "Pending";
}
