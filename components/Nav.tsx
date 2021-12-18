import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div className="shadow-md">
      <div className="flex items-center justify-between m-auto w-[75vw] h-[10vh]">
        <Link href="/">
          <h3 className="cursor-pointer">AlgoWallet</h3>
        </Link>

        {isHome && (
          <Link href="/signin">
            <a className="hidden md:block btn-sky">access</a>
          </Link>
        )}
      </div>
    </div>
  );
}
