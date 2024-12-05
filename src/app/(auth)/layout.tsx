import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="./logo1.svg" height={152} width={56} alt="logo" />
          <div className="flex items-center gap-2">
            <Button variant="secondary">ثبت نام</Button>
          </div>
        </nav>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
