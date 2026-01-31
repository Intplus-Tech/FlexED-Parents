import { ApiEndpoints } from "@/utils/endpoints";
import apiSlice from "..";
import {
  CreateSchoolResponse,
  RegisterParentResponse,
  ResetPasswordRequest,
} from "@/@types/auth";
import { methods } from "@/utils/methods";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    parentRegister: builder.mutation<
      RegisterParentResponse,
      {
        email: string;
        confirmPassword: string;
        password: string;
        schoolId: string;
      }
    >({
      query: (request) => ({
        url: ApiEndpoints.auth.parentRegister,
        method: methods.POST,
        body: request,
      }),
    }),

    resetPassword: builder.mutation<CreateSchoolResponse, ResetPasswordRequest>(
      {
        query: (request) => ({
          url: ApiEndpoints.auth.resetPassword,
          method: "POST",
          body: request,
        }),
      },
    ),
  }),
});

export const { useParentRegisterMutation, useResetPasswordMutation } = authApi;
