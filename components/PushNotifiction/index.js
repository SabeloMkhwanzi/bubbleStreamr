import NotificationItems from "../NotificationItems";
import * as PushSDK from "@pushprotocol/restapi";
import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

export default function PushNotifiction() {
  const [notifications, setNotifications] = useState([]);
  const { address } = useAccount();
  const signer = useSigner(address);

  useEffect(() => {
    const notifications = async () => {
      const notifs = await PushSDK.user.getFeeds({
        user: "eip155:5:0x67Ea839b012319B93319a2b13b08efB9bF18a6F3",
        env: "staging",
      });
      console.log(notifs);
      setNotifications(notifs);
      console.log(notifs);
    };
    notifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OptInChannel = async () => {
    await PushSDK.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681",
      userAddress: `${address}`,
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  };

  return (
    <div>
      {notifications && (
        <NotificationItems
          OptInChannel={OptInChannel}
          notifications={notifications}
        />
      )}
    </div>
  );
}
