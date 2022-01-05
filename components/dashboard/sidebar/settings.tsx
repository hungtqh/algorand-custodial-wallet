import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="mt-10">
      <Link href="/settings">
        <div className="flex items-center px-5 h-[4rem] text-zinc-700 hover:bg-zinc-400 cursor-pointer">
          <FontAwesomeIcon className="mr-10" icon={faCog} />
          <p>Settings</p>
        </div>
      </Link>

      <Link href="/signout">
        <div className="flex items-center px-5 h-[4rem] text-zinc-700 hover:bg-red-400 hover:text-white cursor-pointer">
          <FontAwesomeIcon className="mr-10" icon={faSignOutAlt} />
          <p>Signout</p>
        </div>
      </Link>
    </div>
  );
}
