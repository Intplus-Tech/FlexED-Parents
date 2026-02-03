"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChangePasswordMutation } from "@/redux/api/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { showerror, showsuccess } from "@/utils/toast";

const passwordChangeSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordChangeForm = z.infer<typeof passwordChangeSchema>;

export default function SettingsView() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { currentUser } = useSelector((state: RootState) => state.authState);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      email: currentUser?.email || "",
    },
  });

  const onSubmit = async (data: PasswordChangeForm) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      setSuccessMessage(response.message || "Password changed successfully!");
      reset({
        email: currentUser?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      showsuccess(response.message || "Password changed successfully!")
    } catch (error: any) {
      const message = error?.data?.message || "Failed to change password. Please try again.";
      showerror(message)
    }
  };

  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-12">Settings</h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Email Address Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                ✉️
              </span>
              <input
                type="email"
                {...register("email")}
                disabled
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Current Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
              <input
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? "🚫" : "👁️"}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? "🚫" : "👁️"}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Re-enter New Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ReEnter New Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? "🚫" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
