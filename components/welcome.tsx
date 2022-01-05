import Image from "next/image";
import Link from "next/link";
import dashboard from "public/dashboard.png";

export default function Welcome() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around mx-auto h-[90vh] lg:h-[70vh] w-[90%]">
      <div className="flex flex-col items-center md:items-start gap-5 md:w-[40%] lg:w-[30%] text-center md:text-left">
        <h1 className="leading-tight">AlgoWallet Custodial Algorand Wallet</h1>
        <p className="text-gray-600">
          AlgoWallet is a custodial Algorand Wallet allowing you to freely
          interact with the Algorand blockchain.
        </p>
        <Link href="/dashboard">
          <a className="btn-sky">Access Now</a>
        </Link>
      </div>

      <div className="md:w-[50%] shadow-lg border-2 rounded-lg overflow-hidden">
        <Image src={dashboard} />
      </div>
    </div>
  );
}
