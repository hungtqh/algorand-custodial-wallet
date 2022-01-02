import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useState } from "react";

type Props = {
  id?: string;
  time?: number;
  sender?: string;
  receiver?: string;
  amount?: number;
  fee?: number;
};

export default function Transaction({
  id,
  time,
  sender,
  amount,
  receiver,
  fee,
}: Props) {
  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const [detailActive, setDetailActive] = useState(false);

  const isInCome = currentWallet?.address != sender;
  const d = new Date(0);
  if (time) {
    d.setUTCSeconds(time);
  }

  return (
    <>
      <div
        onClick={() => {
          setDetailActive(!detailActive);
        }}
        className="flex items-center justify-around border-b-[0.1rem]  border-gray-400  h-20 w-full cursor-pointer"
      >
        <div>
          <p className="text-sm">{isInCome ? sender : receiver}</p>
          <span className="text-gray-600">{d.toLocaleString()}</span>
        </div>

        <p>algo</p>
        <p className={`${isInCome ? "text-green-700" : "text-red-700"} w-[2%]`}>
          {isInCome ? "+" : "-"}
          {amount! / 10 ** 6}
        </p>
      </div>

      <div
        className={`${
          detailActive ? "h-20" : "h-0"
        } flex  items-center justify-center gap-10 w-full bg-sky-100 transition-[height] duration-300 overflow-hidden`}
      >
        <div className="flex flex-col  h-[100%] justify-around">
          <p className="text-sm">
            <span className="text-sky-900 font-bold mr-2">TxId:</span>
            {id}
          </p>
          <p className="text-sm">
            <span className="text-sky-900 font-bold mr-2">Fee:</span>
            {fee! / 10 ** 6}
          </p>
        </div>

        <div className="flex flex-col  h-[100%] justify-around">
          <p className="text-sm">
            <span className="text-sky-900 font-bold mr-2">Sender:</span>
            {sender}
          </p>
          <p className="text-sm">
            <span className="text-sky-900 font-bold mr-2">Receiver:</span>
            {receiver}
          </p>
        </div>
      </div>
    </>
  );
}
