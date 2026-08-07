export type WalletLedgerType = "CREDIT" | "DEBIT";

export type WalletLedgerReason =
  | "OVERPAYMENT"
  | "PAYMENT_APPLIED"
  | "REFUND"
  | "ADJUSTMENT"
  | "OPENING_BALANCE";

export interface ParentWallet {
  _id: string;
  parent: string;
  school: string;
  balance: number;
  /** Off-platform credit (school top-ups) — spent before platform-held credit. */
  externalBalance?: number;
  /** balance - externalBalance */
  platformBalance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetParentWalletResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: ParentWallet;
}

export interface ParentWalletLedgerEntry {
  _id: string;
  parent: string;
  school: string;
  type: WalletLedgerType;
  reason: WalletLedgerReason;
  amount: number;
  reference: string;
  transaction: string | null;
  student: { firstName?: string; lastName?: string } | null;
  balanceAfter: number;
  meta?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParentWalletLedgerPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetParentWalletLedgerResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    data: ParentWalletLedgerEntry[];
    pagination: ParentWalletLedgerPagination;
  };
}

export interface PayFromWalletAllocation {
  paymentItemId: string;
  amount: number;
}

export interface PayFromWalletRequest {
  studentId: string;
  allocations: PayFromWalletAllocation[];
}

export interface PayFromWalletTransaction {
  reference: string;
  amount: number;
  status: string;
  provider?: string;
}

export interface PayFromWalletResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    reference: string;
    totalApplied: number;
    walletBalance: number;
    transactions: PayFromWalletTransaction[];
  };
}
