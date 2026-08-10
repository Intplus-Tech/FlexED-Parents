"use client";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  HomeIcon,
  LogoutIcon,
  MoreIcon,
  PaymentIcon,
  SettingsIcon,
} from "@/icons";
import { Wallet } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/auth";
import {
  useGetParentDetailsQuery,
  useGetParentProfileQuery,
} from "@/redux/api/parents";

interface PortalSidebarProps {
  onClose?: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { id: "pay-fees", label: "Pay Fees", href: "/pay-fees", icon: PaymentIcon },
  { id: "wallet", label: "Wallet", href: "/wallet", icon: Wallet },
];

export default function PortalSidebar({ onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: parentDetails } = useGetParentProfileQuery();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    const data = await signOut({ redirect: false, callbackUrl: "/auth/login" });
    router.push(data?.url || "/auth/login");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (session as any)?.user;
  const displayName =
    user?.name ?? user?.fullName ?? user?.firstName ?? "Account";
  const displayEmail = user?.email ?? "";

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">FlexED Systems</h2>
            <p className="text-xs text-purple-600">Parent Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3 space-y-2">
        <Link
          href="/settings"
          onClick={onClose}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            pathname === "/settings"
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=AmaraBling"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-left min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {displayName}
              </p>
              {displayEmail ? (
                <p className="text-xs text-gray-500 truncate">{displayEmail}</p>
              ) : null}
            </div>
            <MoreIcon className="w-5 h-5 text-gray-400 shrink-0" />
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
              <button
                onClick={() => {
                  handleLogout();
                  onClose?.();
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm transition-colors duration-200"
              >
                <LogoutIcon className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
