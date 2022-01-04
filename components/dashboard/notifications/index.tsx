import Notification from "./notification";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect, useState } from "react";
import { Payload as NotificationsType } from "redux/reducers/notificationReducer";

export default function Notifications() {
  const notifications = useSelector((state: RootState) => state.notifications);

  const [showedAlerts, setShowedAllerts] = useState<NotificationsType>([]);

  useEffect(() => {
    console.log("here");
    if (notifications.length > 0) {
      setShowedAllerts([
        notifications[notifications.length - 1],
        ...showedAlerts,
      ]);
    }
  }, [notifications]);

  return (
    <div className="absolute pointer-events-none top-0 right-0 overflow-hidden h-full w-[20%] flex flex-col items-center justify-end">
      {showedAlerts.map((alert, index) => {
        return (
          <Notification key={index} type={alert.type} message={alert.message} />
        );
      })}
    </div>
  );
}
