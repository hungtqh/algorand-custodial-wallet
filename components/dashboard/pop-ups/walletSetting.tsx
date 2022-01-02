import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useDispatch } from "react-redux";
import { loadWallets, changewalletName } from "redux/actions/walletsAction";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function WalletSetting() {
  const { currentWallet } = useSelector((state: RootState) => state.customer);
  const [newName, setNewName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    setNewName(currentWallet?.name);
  }, [currentWallet]);

  const handleRemoveWallet = () => {
    axios.delete(`/api/wallet/${currentWallet.id}`).then(() => {
      dispatch(loadWallets());
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setNewName(target.value);
  };

  //TODO: set global status
  const handleNameSaved = () => {
    dispatch(changewalletName(currentWallet.id, newName));
  };

  //TODO: check name unqiue
  return (
    <div
      tabIndex={1}
      className="absolute flex flex-col bg-white opacity-0 pointer-events-none peer-focus:pointer-events-auto peer-focus:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100  pt-3 top-5 left-5 w-[15rem] h-[10rem] z-10 shadow-md"
    >
      <div className="flex justify-between px-2">
        <h5 className="text-gray-500">Rename Wallet</h5>
        <button
          onClick={handleNameSaved}
          className="bg-gray-100 text-gray-700 px-1 text-sm"
        >
          Save
        </button>
      </div>
      <input
        className="h-10 my-2 w-[90%] mx-auto"
        type="text"
        value={newName}
        onChange={handleNameChange}
      />
      <hr />
      <button
        onClick={handleRemoveWallet}
        className="text-red-500 hover:bg-red-500 cursor-pointer hover:text-white h-full flex items-center "
      >
        <FontAwesomeIcon icon={faTrash} className="mx-2" />
        <span className="">Remove Wallet</span>
      </button>
    </div>
  );
}
