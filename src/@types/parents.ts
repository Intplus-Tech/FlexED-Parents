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
