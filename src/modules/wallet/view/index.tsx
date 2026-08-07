"use client";

import { useState } from "react";
import { BalanceCard } from "../components/balance-card";
import { LedgerSection } from "../components/ledger-section";
import { RedeemCreditModal } from "../components/redeem-modal";
import {
  useGetParentWalletQuery,
  useGetParentWalletLedgerQuery,
} from "@/redux/api/parent-wallet";
import { WalletLedgerReason, WalletLedgerType } from "@/@types/parent-wallet";

const LIMIT = 10;

export default function WalletView() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<WalletLedgerType | "">("");
  const [reasonFilter, setReasonFilter] = useState<WalletLedgerReason | "">("");
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);

  const { data: walletData, isLoading: isWalletLoading } =
    useGetParentWalletQuery();

  const { data: ledgerData, isFetching: isLedgerFetching } =
    useGetParentWalletLedgerQuery({
      page,
      limit: LIMIT,
      type: typeFilter || undefined,
      reason: reasonFilter || undefined,
    });

  const balance = walletData?.data?.balance ?? 0;

  const handleFilterChange = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="mt-6 space-y-8 pb-8">
      <BalanceCard
        balance={balance}
        isLoading={isWalletLoading}
        onRedeem={() => setIsRedeemOpen(true)}
      />

      <LedgerSection
        entries={ledgerData?.data?.data ?? []}
        pagination={ledgerData?.data?.pagination}
        isLoading={isLedgerFetching}
        typeFilter={typeFilter}
        reasonFilter={reasonFilter}
        onTypeFilterChange={handleFilterChange(setTypeFilter)}
        onReasonFilterChange={handleFilterChange(setReasonFilter)}
        onPageChange={setPage}
      />

      <RedeemCreditModal
        isOpen={isRedeemOpen}
        onClose={() => setIsRedeemOpen(false)}
        walletBalance={balance}
      />
    </div>
  );
}
