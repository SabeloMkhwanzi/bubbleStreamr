import React, { useEffect, useState, useMemo } from "react";
import { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
//import WelcomeScreen from "../components/WelcomeScreen";

// Rainbowkit wallet
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

import { mainnet, optimism, polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, optimism, polygon, polygonMumbai],
  [
    alchemyProvider({
      //apiKey: process.env.ALCHEMY_ID
      apiKey: "oMM0vOj56LhAqY5t4YGaI8CdktKDNFsD",
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

import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const theme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

export default function App(props: AppProps) {
  // Defining Color Mode
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { Component, pageProps } = props;
  const [loading, setLoading] = useState(false);

  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
      }),
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
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
          {/* {!loading ? <Component {...pageProps} /> : <WelcomeScreen />} */}
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
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
