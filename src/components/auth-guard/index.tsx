"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SignInResponse } from "@/@types/auth";
import { setAuth } from "@/redux/slice/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status, data } = useSession();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.authState);

  // Hydrate Redux from Session Cookie
  useEffect(() => {
    if (status === "authenticated" && data) {
      const Data = data as unknown as {
        accessToken: string;
        refreshToken: string;
        user: SignInResponse["data"]["user"];
      };
      
      dispatch(
        setAuth({
          accessToken: Data.accessToken,
          currentUser: Data.user,
        })
      );
    }
  }, [status, data, dispatch]);

  // Protect Route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [router, status]);

  // Loading State while authenticating or hydrating Redux
  if (status === "loading" || (status === "authenticated" && !currentUser)) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50/30">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-purple-600 animate-spin" />
          <span className="text-sm font-medium">Authenticating…</span>
        </div>
      </div>
    );
  }

  // Render children only if properly authenticated
  if (status === "authenticated" && currentUser) {
    return <>{children}</>;
  }

  // Fallback
  return null;
}
