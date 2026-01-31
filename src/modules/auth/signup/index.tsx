"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  Logo,
  MailIcon,
} from "@/icons";
import { SignupFormData, signupSchema } from "@/lib/validation";
import { useGetParentDetailsQuery } from "@/redux/api/parents";
import { useRouter, useSearchParams } from "next/navigation";
import { useParentRegisterMutation } from "@/redux/api/auth";

function SignupView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const {
    data: parentDetails,
    isFetching: isFetchingParentDetails,
    isLoading: isLoadingParentDetails,
  } = useGetParentDetailsQuery({ token: String(token) }, { skip: !token });

  const [parentRegister, { isLoading }] = useParentRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const agreeToTerms = watch("agreeToTerms");
  const agreeToPrivacy = watch("agreeToPrivacy");
  const confirmParent = watch("confirmParentGuardian");

  useEffect(() => {
    if (parentDetails?.data?.parent?.firstName) {
      reset({
        email: parentDetails?.data?.parent?.email,
      });
    }
  }, [parentDetails, reset]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await parentRegister({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        schoolId: String(parentDetails?.data?.school?._id),
      }).unwrap();
      localStorage.setItem("parentToken", res.data.token);
      router.push("/dashboard");
      console.log("Parent registered successfully:", res);
    } catch (error) {
      console.error("Error registering parent:", error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-12 w-1/2 hidden lg:block">
          <div className="mb-8 flex items-center justify-center">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2 max-w-[400px] mx-auto">
            Welcome Mr {parentDetails?.data?.parent?.firstName}{" "}
            {parentDetails?.data?.parent?.lastName}
          </h2>
          <p className="text-gray-600 text-center">
            You are managing Fees For:{" "}
            <span className="block mt-2">
              {parentDetails?.data?.children.map((child) => (
                <span
                  key={child.id}
                  className="text-purple-600 font-semibold block"
                >
                  {`${child?.firstName} ${child?.lastName}`} -{" "}
                  {child?.class?.name ?? "Not Assigned"}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="w-full lgw-1/2 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <h1 className="font-medium text-2xl py-2">Create your account</h1>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="adebayo.j@email.com"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className=" pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Secure Your Access
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    {...register("password")}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    {...register("confirmPassword")}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className=" pt-6 space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  className="w-5 h-5 mt-0.5 accent-purple-600 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I agree to the FlexED System Terms of Service
                </span>
                {agreeToTerms && (
                  <CheckIcon className="w-5 h-5 text-purple-600 ml-auto shrink-0" />
                )}
              </label>

              <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <input
                  type="checkbox"
                  {...register("agreeToPrivacy")}
                  className="w-5 h-5 mt-0.5 accent-purple-600 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Privacy Policy
                </span>
                {agreeToPrivacy && (
                  <CheckIcon className="w-5 h-5 text-purple-600 ml-auto shrink-0" />
                )}
              </label>

              <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <input
                  type="checkbox"
                  {...register("confirmParentGuardian")}
                  className="w-5 h-5 mt-0.5 accent-purple-600 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I confirm I am the parent/guardian of the student(s) listed
                  above
                </span>
                {confirmParent && (
                  <CheckIcon className="w-5 h-5 text-purple-600 ml-auto shrink-0" />
                )}
              </label>

              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">
                  {errors.agreeToTerms.message}
                </p>
              )}
              {errors.agreeToPrivacy && (
                <p className="text-red-500 text-sm">
                  {errors.agreeToPrivacy.message}
                </p>
              )}
              {errors.confirmParentGuardian && (
                <p className="text-red-500 text-sm">
                  {errors.confirmParentGuardian.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Creating Account..." : "Create My Account"}
            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Suspense>
        <SignupView />
      </Suspense>
    </>
  );
}
