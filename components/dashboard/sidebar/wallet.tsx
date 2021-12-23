import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

type SideWalletProps = {
  walletName: string;
  balance: number;
};

export default function Wallet({ walletName, balance }: SideWalletProps) {
  return (
    <div className="h-[4rem] bg-sky-200 flex items-center justify-between mb-1 cursor-pointer">
      <div className="flex items-center ml-2">
        <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
          {walletName[0] + " " + walletName[walletName.length - 1]}
        </div>

        <div className="ml-2">
          <h4>{walletName}</h4>
          <span>{balance}$</span>
        </div>
      </div>

      <div className="text-gray-400 mr-2 w-5 h-5 rounded-full hover:bg-red-400 flex items-center justify-center hover:text-white">
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
}
