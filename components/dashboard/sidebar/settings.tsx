import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  return (
    <div className="mt-10">
      <div className="flex items-center px-5 h-[4rem] text-zinc-700 hover:bg-zinc-400 cursor-pointer">
        <FontAwesomeIcon className="mr-10" icon={faCog} />
        <p>Settings</p>
      </div>
    </div>
  );
}
