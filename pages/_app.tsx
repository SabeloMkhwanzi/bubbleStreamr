import React, { useEffect, useState, useMemo } from "react";
import { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
//import WelcomeScreen from "../components/WelcomeScreen";

// Rainbowkit wallet
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

import {
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  goerli,
} from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, optimism, polygon, polygonMumbai, goerli],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BubbleStreamr",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App(props: AppProps) {
  // Defining Color Mode
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { Component, pageProps } = props;

  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
      }),
    });
  }, []);

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              bgColor: ["#0A1A2F"],
            },
          }}
        >
          <NotificationsProvider>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <LivepeerConfig
                  dehydratedState={pageProps?.dehydratedState}
                  client={livepeerClient}
                >
                  <Component {...pageProps} />
                </LivepeerConfig>
              </RainbowKitProvider>
            </WagmiConfig>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
