import { AuthProvider } from "@/components/admin/AuthProvider";
import AdminLayout from "@/components/admin/AdminLayout";
import "@/public/assets/scss/admin.scss";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Manage your portfolio and blog content",
};

export default function AdminRootLayout({ children }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
