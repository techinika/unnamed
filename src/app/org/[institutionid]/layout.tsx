"use client";

import DashboardLayout from "@/components/admin/main/DashboardLayout";
import React, { use } from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ institutionid: string }>;
}) {
  const { institutionid } = use(params);
  return (
    <DashboardLayout institutionId={institutionid}>{children}</DashboardLayout>
  );
}
