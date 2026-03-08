import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StoreTabs } from "@/components/StoreTabs";

export default function StoreLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <StoreTabs />
                <div className="pt-2">
                    {children}
                </div>
            </div>
        </DashboardLayout>
    );
}
