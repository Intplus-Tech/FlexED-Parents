import { ApiEndpoints } from "@/utils/endpoints";
import apiSlice from "..";
import {
  CreateSchoolResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
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
    changePassword: builder.mutation<
      CreateSchoolResponse,
      { currentPassword: string; newPassword: string }
    >({
      query: (request) => ({
        url: ApiEndpoints.auth.changePassword,
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
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (request) => ({
        url: ApiEndpoints.auth.forgotPassword,
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export const {
  useParentRegisterMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
} = authApi;
