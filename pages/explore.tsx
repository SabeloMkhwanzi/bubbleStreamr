import Head from "next/head";
import { Footer, NavbarHeader, VideoMinter } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";

export default function createStream() {
  return (
    <>
      <Head>
        <title>Explore | BubbleStreamr</title>
        <meta
          name="description"
          content="A decentralized video streaming platform that provides live video streaming infrastructure to video content creators."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={<NavbarHeader />}
        footer={<Footer />}
        styles={(theme) => ({
          main: {
            width: "100hw",
            height: "100hv",
          },
        })}
      >
        <ScrollArea style={{ height: "100%" }}>
          <VideoMinter />
        </ScrollArea>
      </AppShell>
    </>
  );
}
