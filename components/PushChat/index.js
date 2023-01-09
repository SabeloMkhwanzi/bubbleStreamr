import React from "react";
import { Chat } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";

const PushChatApiKey = process.env.NEXT_PUBLIC_PUSHCHAT_API_KEY;

export default function PushChat() {
  const { address } = useAccount();

  return (
    <div>
      <Chat
        primaryColor="#00eb88"
        modalTitle="BubbleStreamr"
        account={address} //user address
        supportAddress="0xF76371C3f5B4b06BC62e3Fb1101E1fa3073Fbb54" //support address
        apiKey={PushChatApiKey}
        env="staging"
      />
    </div>
  );
}
