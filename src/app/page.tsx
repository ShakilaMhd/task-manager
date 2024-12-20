"use client"

import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  const router = useRouter()
  const {data, isLoading} = useCurrent()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in")
    }
  },[data])
  return (
    <>
      <h1>only visible to authorized users</h1>
    </>
  );
}
