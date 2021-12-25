import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  return (
    <Link href="/dashboard">
      <a className="absolute w-10 h-10 left-2 top-2 flex justify-center items-center text-gray-400">
        <FontAwesomeIcon icon={faArrowLeft} size={"2x"} />
      </a>
    </Link>
  );
}
