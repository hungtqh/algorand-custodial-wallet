import Link from "next/link";

export default function Nav() {
  return (
    <div className="shadow-md">
      <div className="flex items-center justify-between m-auto w-[75vw] h-[10vh]">
        <Link href="/dashboard">
          <h3 className="cursor-pointer">AlgoWallet Dashboard</h3>
        </Link>
      </div>
    </div>
  );
}
