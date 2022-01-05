import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useState } from "react";
import DetailItem from "./detailItem";

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

  const isInCome = currentWallet.address != sender;
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
        <div className="w-[35%]">
          <p className="text-sm truncate ...">{isInCome ? sender : receiver}</p>
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
          detailActive ? "h-40 lg:h-20" : "h-0"
        } flex flex-col  lg:flex-row   items-center justify-center lg:gap-10 w-full  bg-sky-100 transition-[height] duration-300 overflow-hidden`}
      >
        <div className="flex flex-col h-[100%] justify-around w-[92%] md:w-[80%] lg:w-min">
          <DetailItem name="TxId" value={id} />
          <DetailItem name="Fee" value={fee ? fee / 10 ** 6 : ""} />
        </div>

        <div className="flex flex-col  h-[100%] justify-around w-[92%] md:w-[80%] lg:w-min">
          <DetailItem name="Sender" value={sender} />
          <DetailItem name="Receiver" value={receiver} />
        </div>
      </div>
    </>
  );
}
