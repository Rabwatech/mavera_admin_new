"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";
import { UserRole } from "../types/auth";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.role) return;
    if (user.role === UserRole.SUPER_ADMIN) {
      router.replace("/admin");
      return;
    }
    if (user.role === UserRole.SALES_AGENT) {
      router.replace("/sales-dashboard");
      return;
    }
    if (user.role === UserRole.CALL_CENTER) {
      router.replace("/leads");
      return;
    }
    if (user.role === UserRole.FINANCE_MANAGER) {
      router.replace("/admin/finance");
      return;
    }
    router.replace("/sales-dashboard");
  }, [user?.role, router]);

  return null;
}
