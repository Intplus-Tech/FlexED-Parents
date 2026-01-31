import { ApiEndpoints } from "@/utils/endpoints";
import apiSlice from "..";
import { QueryHelper } from "@/utils/functions";
import {
  GetParentsDetailsResponse,
  ParentDashboardResponse,
  ParentTransactionsResponse,
  MakePaymentRequest,
  MakePaymentResponse
} from "@/@types/parents";
import { methods } from "@/utils/methods";

const parentsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getParentDetails: builder.query<
      GetParentsDetailsResponse,
      { token: string }
    >({
      query: (request) => ({
        url: QueryHelper(ApiEndpoints.parent.parentInviteDetails, request),
        method: methods.GET,
      }),
    }),
    getParentTransaction: builder.query<ParentTransactionsResponse, { limit?: number }>({
      query: (request) => ({
        url: QueryHelper(ApiEndpoints.parent.parentTransaction, request),
      }),
    }),

    getParentDashboard: builder.query<ParentDashboardResponse, void>({
      query: () => ({
        url: ApiEndpoints.parent.parentDashbaord,
      }),
    }),

    
    makePayment: builder.mutation<
      MakePaymentResponse,
      MakePaymentRequest
    >({
      query: (payload) => ({
        url: ApiEndpoints.parent.makepayment,
        method: methods.POST,
        body: payload,
      }),
    }),



  }),
});

export const {
  useGetParentDetailsQuery,
  useGetParentDashboardQuery,
  useGetParentTransactionQuery,
  useMakePaymentMutation, 
} = parentsApi;
