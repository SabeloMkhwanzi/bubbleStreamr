import Head from "next/head";
import Image from "next/image";
import { Footer, HeroPage, NavbarHeader } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";
//import Navbar from "../components/Navbar";
//import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>BubbleStreamr</title>
        <meta
          name="description"
          content="A decentralized video streaming platform that provides live video streaming infrastructure to video content creators."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        //navbar={<SideNavbarDiffusion />}
        header={<NavbarHeader />}
        footer={<Footer />}
        styles={(theme) => ({
          main: {
            width: "100%",
            height: "100%",
          },
        })}
      >
        <ScrollArea style={{ height: "100%" }}>
          <HeroPage />
        </ScrollArea>
      </AppShell>
    </>
  );
}
