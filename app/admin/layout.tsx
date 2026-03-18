import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

import AdminNavbar from "@/components/AdminNavbar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminNavbar />
            <div className="p-8">
                <div className="max-w-6xl mx-auto">{children}</div>
            </div>
        </div>
    );
}
