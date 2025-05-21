import { Sidebar, SidebarProvider } from "@/components/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const expended = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <>
      <SidebarProvider defaultOpen={expended}>
        <Sidebar />
        <div className="relative flex min-h-svh flex-1 flex-col">
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}
