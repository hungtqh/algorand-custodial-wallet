import { ReactNode } from "react";
import Nav from "./Nav";
import SideBar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex justify-center items-center h-[90vh]">
        <SideBar />

        {children}
      </main>
    </>
  );
}
