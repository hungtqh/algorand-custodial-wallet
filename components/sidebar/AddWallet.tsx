import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SideAddWallet() {
  return (
    <Link href="/add-wallet">
      <div className=" flex items-center w-[100%] h-[4rem] cursor-pointer hover:bg-blue-200">
        <div className="w-10 h-10 mx-2  bg-blue-500 text-white flex items-center justify-center rounded-full">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <p>Add Wallet</p>
      </div>
    </Link>
  );
}
