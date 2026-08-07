"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginCard() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    toast.loading("Redirecting to Google...");

    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border border-foreground bg-background p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">A</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground dark:text-primary-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-background">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="group mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-background bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <div className="rounded-full bg-background p-2 transition group-hover:scale-110 dark:bg-slate-700">
                <FcGoogle className="h-5 w-5" />
              </div>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-background" />
          <span className="mx-4 text-xs uppercase tracking-widest text-background">
            Secure Login
          </span>
          <div className="h-px flex-1 bg-background" />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-background">
          By continuing, you agree to our{" "}
          <span className="cursor-pointer font-medium text-primary">
            Terms
          </span>{" "}
          and{" "}
          <span className="cursor-pointer font-medium text-primary">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}