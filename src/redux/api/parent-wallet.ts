import { ApiEndpoints } from "@/utils/endpoints";
import apiSlice from "..";
import { QueryHelper } from "@/utils/functions";
import { methods } from "@/utils/methods";
import {
  GetParentWalletResponse,
  GetParentWalletLedgerResponse,
  PayFromWalletRequest,
  PayFromWalletResponse,
  WalletLedgerType,
  WalletLedgerReason,
} from "@/@types/parent-wallet";

const parentWalletApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getParentWallet: builder.query<GetParentWalletResponse, void>({
      query: () => ({
        url: ApiEndpoints.parent.parentWallet,
      }),
      providesTags: ["ParentWallet"],
    }),

    getParentWalletLedger: builder.query<
      GetParentWalletLedgerResponse,
      {
        page?: number;
        limit?: number;
        type?: WalletLedgerType;
        reason?: WalletLedgerReason;
      }
    >({
      query: (params) => ({
        url: QueryHelper(ApiEndpoints.parent.parentWalletLedger, params),
      }),
      providesTags: ["ParentWallet"],
    }),

    payFromWallet: builder.mutation<
      PayFromWalletResponse,
      PayFromWalletRequest
    >({
      query: (body) => ({
        url: ApiEndpoints.parent.parentWalletPay,
        method: methods.POST,
        body,
      }),
      invalidatesTags: ["ParentWallet", "ParentDashboard"],
    }),
  }),
});

export const {
  useGetParentWalletQuery,
  useGetParentWalletLedgerQuery,
  usePayFromWalletMutation,
} = parentWalletApi;
