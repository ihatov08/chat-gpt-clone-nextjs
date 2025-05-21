import { Sidebar } from "@/components/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="group/sidebar-wrapper flex min-h-svh w-full">
        <Sidebar />
        <div className="relative flex min-h-svh flex-1 flex-col">
          {children}
        </div>
      </div>
    </>
  );
}
