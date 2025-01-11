"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
      <AlertTriangle />
      <p className="text-sm text-muted-foreground">مشکلی پیش آمده</p>
      <Button variant="secondary">
        <Link href="/">رفتن به خانه</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
