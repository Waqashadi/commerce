"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function LogoutButton() {
  const handleLogout = () => {
    toast.success("Logged out successfully!", {
      description: "Redirecting to the login page...",
      duration: 1500,
    });

    setTimeout(() => {
      signOut({
        callbackUrl: "/",
      });
    }, 1500);
  };

  return (
    <button
      onClick={handleLogout}
      className="group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
    >
      <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Logout</span>
    </button>
  );
}