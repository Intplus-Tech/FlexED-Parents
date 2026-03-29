/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "./store";
import { signOut } from "next-auth/react";
import { ApiEndpoints } from "@/utils/endpoints";
import { showerror } from "@/utils/toast";
import { logout } from "@/redux/slice/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: ApiEndpoints.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.accessToken;
    // const token = localStorage.getItem("parentToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuthRedirect: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.statusCode === 401 ||
      result.error.statusCode === 403 ||
      result.error.statusCode === 404)
  ) {
    console.log("result.error", result.error);
    if (typeof window !== "undefined") {
      showerror("Session expired, please login again");
      api.dispatch(logout());
      signOut({ redirect: false, callbackUrl: "/auth/login" }).then((data) => {
        window.location.href = data?.url || "/auth/login";
      });
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ["Transaction", "sms", "students", "academicSession", "classes"],
  endpoints: () => ({}),
});

export default apiSlice;
