"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CloseIcon, MenuIcon } from "@/icons";
import PortalSidebar from "@/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SignInResponse } from "@/@types/auth";
import { setAuth } from "@/redux/slice/auth";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status ,data} = useSession();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.authState);


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

  useEffect(() => {
    if (status === "unauthenticated" && !currentUser) {
      router.replace("/auth/login");
    }
  }, [router, status, currentUser]);

  if (status === "loading" || !currentUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-60 2xl:w-72 2xl:bg-blue-700  lg:static transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <PortalSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-white">F</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900 lg:hidden"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 md:px-3 xl:px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
