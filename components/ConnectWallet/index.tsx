import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const { address } = useAccount();
  return (
    <div>
      <ConnectButton
        chainStatus="none"
        showBalance={false}
        label="Connect Wallet"
      />
    </div>
  );
}
