import Head from "next/head";
import { Footer, NavbarHeader, PushChat, VideoUploader } from "../components";
import { AppShell, ScrollArea } from "@mantine/core";

//import { Inter } from "@next/font/google";

//const inter = Inter({ subsets: ["latin"] });

export default function createStream() {
  return (
    <>
      <Head>
        <title>Publish | BubbleStreamr</title>
        <meta
          name="description"
          content="A live streaming platform allows you to upload and broadcast video content in real time"
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
          {/* <VideoUploader /> */}
        </ScrollArea>
      </AppShell>
    </>
  );
}
