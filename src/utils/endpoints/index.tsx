export const auth = {
  login: "auth/login",
  changePassword: "auth/change-password",
  resetPassword: "auth/reset-password",
  verifyAccount: "auth/verify-account",
  resentOtp: "auth/resend-otp",
  forgotPassword: "auth/forgot-password",
  parentRegister: "/parents/register",
};

export const parent = {
  parentRegister: "parents/register",
  parentInvite: "parents/invite",
  parentInviteDetails: "/parents/invite/details",
  parentChildren: "/parents/me/children",
  parentDashbaord: "/parents/me/dashboard",
  parentTransaction: "/parents/me/transactions",
  makepayment: "/payments/initiate-student-dva",
};

export const ApiEndpoints = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  auth,
  parent,
};
