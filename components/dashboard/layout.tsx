import { ReactNode } from "react";
import Nav from "components/dashboard/nav";
import Sidebar from "components/dashboard/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex justify-center items-center">
        <Sidebar />

        {children}
      </main>
    </>
  );
}
