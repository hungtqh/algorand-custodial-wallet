import { ReactNode } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex justify-center items-center h-[90vh]">
        {children}
      </main>
    </>
  );
}
