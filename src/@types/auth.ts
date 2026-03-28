export interface SignInResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
      isVerified: boolean;
      schoolId: string;
    };
  };
}

export interface CreateSchoolRequest {
  name: string;
  address: string;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
  logoUrl?: string;
  metadata?: {
    additionalProp1: unknown;
  };
  schoolType: "Public" | "Private";
  password: string;
}

export interface CreateSchoolResponse {
  message: string;
}

export interface VerifyAccountRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: null;
  statusCode: number;
}

export interface ResetPasswordRequest {
  email: string;
  token?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResendOTPRequest {
  email: string;
}

export interface RegisterParentResponse {
  success: boolean;
  message: string;
  data: RegisterParentData;
  statusCode: number;
}

export interface RegisterParentData {
  token: string;
  parent: Parent;
}

export interface Parent {
  _id: string;
  email: string;
  school: string;
  __v: number;
  address: string;
  authUserId: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | string;
  inviteTokenHash: string | null;
  isRegistered: boolean;
  occupation: string;
  phone: string;
  relationship: "PARENT" | string;
  title: string;
}
