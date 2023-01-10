import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Center, Group, Text } from "@mantine/core";
import { IoWallet } from "react-icons/io5";
import { Petrona } from "@next/font/google";

const petrona = Petrona({ weight: "500" });
export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                border: "2px solid red",
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    radius="md"
                    variant="default"
                    leftIcon={<IoWallet size={"28px"} color="#00eb88" />}
                    onClick={openConnectModal}
                  >
                    <Text color="gray.5" fw="700" className={petrona.className}>
                      Connect Wallet
                    </Text>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>;
              }

              return (
                <Group>
                  <Center onClick={openChainModal}>
                    {chain.hasIcon && (
                      <Center>
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 26, height: 26 }}
                          />
                        )}
                      </Center>
                    )}
                  </Center>
                  <Button
                    radius="md"
                    variant="default"
                    onClick={openAccountModal}
                  >
                    <Text
                      fw="500"
                      fz="md"
                      color="#00eb88"
                      className={petrona.className}
                    >
                      {account.displayName}
                    </Text>
                  </Button>
                </Group>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
