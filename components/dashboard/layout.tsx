import { ReactNode } from "react";
import Nav from "components/dashboard/nav";
import Sidebar from "components/dashboard/sidebar";
import Notifications from "components/dashboard/notifications";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <Notifications />
      <main className="flex justify-center items-center overflow-x-hidden">
        <Sidebar />

        {children}
      </main>
    </>
  );
}
