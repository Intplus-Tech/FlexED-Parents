"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SignInResponse } from "@/@types/auth";
import { setAuth } from "@/redux/slice/auth";
import { LogoLoader } from "@/components/ui/logo-loader";

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
        <LogoLoader size={80} />
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
