import Head from "next/head";
import { Footer, JoinStream, NavbarHeader } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";

//import { Inter } from "@next/font/google";

//const inter = Inter({ subsets: ["latin"] });

export default function createStream() {
  return (
    <>
      <Head>
        <title>Join Stream | BubbleStreamr</title>
        <meta
          name="description"
          content="A decentralized video streaming platform that provides live video streaming infrastructure to video content creators."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell header={<NavbarHeader />} footer={<Footer />}>
        <ScrollArea style={{ height: "100%" }}>
          <JoinStream />
        </ScrollArea>
      </AppShell>
    </>
  );
}
