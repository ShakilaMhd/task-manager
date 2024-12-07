"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="./logo1.svg" height={152} width={56} alt="logo" />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "ثبت نام" : "ورود"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
