export interface GetParentsDetailsResponse {
  success: boolean;
  message: string;
  data: Data;
  statusCode: number;
  meta: Meta;
}

export interface Data {
  parent: Parent;
  school: School;
  children: Child[];
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
}

export interface School {
  _id: string;
  name: string;
  type: string;
  address: string;
  logoUrl: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  class: ClassInfo;
}

export interface ClassInfo {
  id: string;
  name: string;
}

export interface Meta {
  additionalProp1: Record<string, unknown>;
}

export interface ParentDashboardResponse {
  success: boolean;
  message: string;
  data: ParentDashboardData;
  statusCode: number;
}

export interface ParentDashboardData {
  totalOutstanding: number;
  students: StudentDashboard[];
}

export interface StudentDashboard {
  id: string;
  firstName: string;
  lastName: string;
  class: StudentClass | null;
  totalOutstanding: number;
  items: PaymentItem[];
}

export interface StudentClass {
  id: string;
  name: string;
}

export interface PaymentItem {
  paymentItemId: string;
  name: string;
  amount: number;
  paidSoFar: number;
  outstanding: number;
  status: "PENDING" | "PAID" | "PARTIALLY_PAID" | string;
  dueDate: string; // ISO date string
}

export interface ParentTransactionsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: TransactionData;
}

export interface TransactionData {
  items: TransactionItem[];
  rows: TransactionRow[];
}

// Interfaces for the 'items' array
export interface TransactionItem {
  _id: string;
  reference: string;
  status: "PAID" | "PENDING" | "FAILED"; // Union type for better type safety
  amount: number;
  createdAt: string;
  student: Student;
  paymentItem: PaymentItem;
}

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  class: StudentClass;
}

export interface StudentClass {
  _id: string;
  name: string;
}

export interface PaymentItem {
  _id: string;
  name: string;
  amount: number;
}

// Interfaces for the 'rows' array (often used for tables)
export interface TransactionRow {
  time: string;
  transactionId: string;
  studentId: string;
  studentName: string;
  className: string;
  paymentItemId: string;
  paymentItemName: string;
  termFee: number;
  amountPaid: number;
  percentRemaining: number;
  status: string;
}

// Payment request + response types
export interface MakePaymentRequest {
  studentIds: string[];
  paymentItemIds: string[];
  duration: number;
  email: string;
}

export interface MakePaymentResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    groupReference: string;
    totalAmount: number;

    transactions: Array<{
      transactionId: string;
      reference: string;
      studentId: string;
      paymentItemId: string;
      amount: number;
    }>;

    dva: DVADetails;
  };
}

export interface DVADetails {
  account_number: string;
  account_name: string;
  expires_at: string; // ISO date string
  expected_amount: string; // comes as string from API
  bank: string;
  currency: "NGN";
  transaction_reference: string;

  raw: {
    status: number;
    success: boolean;
    message: string;
    data: {
      is_blocked: boolean;
      account_name: string;
      account_number: string;
      expected_amount: string;
      expires_at: string;
      transaction_reference: string;
      bank: string;
      currency: "NGN";
    };
  };
}

export interface TransactionStatusResponse {
  success: boolean;
  message: string;
  data: TransactionStatusData;
  statusCode: number;
}

export interface TransactionStatusData {
  reference: string;
  summaryStatus: TransactionSummaryStatus;
  count: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  reference: string;
  groupReference: string;
  providerReference: string;
  status: TransactionStatus;
  amount: number;
  studentId: string;
  paymentItemId: string;
}

export type TransactionSummaryStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
