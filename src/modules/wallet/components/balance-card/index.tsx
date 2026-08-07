import { Wallet, ArrowRight } from "lucide-react";
import { formatNaira } from "@/utils/functions";

interface BalanceCardProps {
  balance: number;
  onRedeem: () => void;
  isLoading?: boolean;
}

export function BalanceCard({ balance, onRedeem, isLoading }: BalanceCardProps) {
  const hasCredit = balance > 0;

  return (
    <div className="bg-linear-to-br from-[#702DFF] to-[#5A1FE0] rounded-3xl px-6 py-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
            <Wallet className="w-4 h-4" />
            Wallet Balance
          </div>
          {isLoading ? (
            <div className="h-10 w-40 bg-white/20 rounded animate-pulse mt-2" />
          ) : (
            <p className="text-4xl font-bold mt-2 tracking-tight">
              {formatNaira(balance)}
            </p>
          )}
          <p className="text-white/70 text-sm mt-2 max-w-md">
            Credit from overpaying a fee. Spend it on any of your children&apos;s
            fees at this school, whenever you choose.
          </p>
        </div>

        {hasCredit && (
          <button
            onClick={onRedeem}
            className="inline-flex items-center gap-2 bg-white text-[#702DFF] px-5 py-3 rounded-xl font-semibold hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            Use Credit
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
