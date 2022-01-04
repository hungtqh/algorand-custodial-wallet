import { NotificationType } from "redux/reducers/notificationReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { shiftNotification } from "redux/actions/notificationsAction";

type Props = {
  type: NotificationType;
  message: string;
};

export default function Notification({ type, message }: Props) {
  const icon = { info: faInfo, error: faExclamationTriangle, success: faCheck };
  const color = {
    info: "bg-gray-300",
    error: "bg-red-400",
    success: "bg-green-500",
  };
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      dispatch(shiftNotification());
    }, 3000);
  }, []);

  //   const handleClose = () => {
  //     setShow(false);
  //     dispatch(shiftNotification());
  //   };

  return show ? (
    <div className="relative my-5 w-[80%] h-[5rem] rounded-lg bg-gray-100 flex items-center justify-around">
      {/* <div
        onClick={handleClose}
        className="absolute top-1 right-3 cursor-pointer"
      >
        x
      </div> */}

      <div
        className={`w-8 h-8 flex items-center text-white justify-center ${color[type]} rounded-full`}
      >
        <FontAwesomeIcon icon={icon[type]} />
      </div>

      <div className="text-center ">
        <p>{message}</p>
      </div>
    </div>
  ) : null;
}
