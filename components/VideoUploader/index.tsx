import { useRef } from "react";
import {
  Player,
  useAsset,
  useCreateAsset,
  useUpdateAsset,
} from "@livepeer/react";
import { useState } from "react";
import { Box, Button, Center, TextInput, Text } from "@mantine/core";
import HeaderTitle from "../HeaderTitle";

export default function VideoUploader() {
  const [video, setVideo] = useState<File | undefined>(undefined);

  //1. useCreateAsset Hook for creating a new Asset
  const {
    mutate: createAsset,
    data: createdAsset,
    status,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  );

  //2. useAsset - Hook for retrieving an Asset(opens in a new tab) based on a unique identifier
  const { data: asset } = useAsset({
    refetchInterval: (asset) => (!asset?.playbackUrl ? 5000 : false),
  });

  //3. useUpdateAsset - Hook for updating an existing Asset(opens in a new tab).
  const {
    mutate: updateAsset,
    status: updateStatus,
    error,
  } = useUpdateAsset({
    assetId: asset?.id,
    storage: { ipfs: true },
  });
  return (
    <>
      {/* <Group position="center" my={10} mt="md">
        <Dropzone
          accept="video/mp4"
          openRef={openRef}
          onDrop={() => {}}
          activateOnClick={false}
          styles={{ inner: { pointerEvents: "all" } }}
        >
          <Group position="center">
            <Button
              styles={(theme) => ({
                root: {
                  backgroundColor: "#00eb88",
                  borderRadius: 10,
                  height: 42,
                  paddingLeft: 20,
                  paddingRight: 20,

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#00eb88", 0.05),
                  },
                },
              })}
              onClick={() => openRef.current()}
            >
              Select files
            </Button>
          </Group>
        </Dropzone>
      </Group> */}
      <HeaderTitle />
      <Center>
        <Box my={10}>
          <TextInput
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e?.target?.files?.[0])}
          />
        </Box>
      </Center>

      <Center>
        <Button
          styles={(theme) => ({
            root: {
              backgroundColor: "#00eb88",
              borderRadius: 10,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              "&:hover": {
                backgroundColor: theme.fn.darken("#00eb88", 0.05),
              },
            },
          })}
          disabled={!video || status === "loading"}
          onClick={() => {
            if (video) {
              createAsset?.();
            }
          }}
        >
          Create Asset
        </Button>
        <Button
          mx={7}
          styles={(theme) => ({
            root: {
              backgroundColor: "#00eb88",
              borderRadius: 10,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              "&:hover": {
                backgroundColor: theme.fn.darken("#00eb88", 0.05),
              },
            },
          })}
          disabled={
            !asset?.id || status === "loading" || updateStatus === "loading"
          }
          onClick={async () => {
            if (asset?.id) {
              updateAsset?.();
            }
          }}
        >
          Upload to IPFS
        </Button>
        {asset?.playbackId && (
          <>
            <Text>Asset Name: {asset?.name}</Text>
            <Box>Playback URL: {asset?.playbackUrl}</Box>
            <Text>IPFS CID: {asset?.storage?.ipfs?.cid ?? "None"}</Text>
            <Player playbackId={asset?.playbackId} />
          </>
        )}
        {error && <div>{error.message}</div>}
      </Center>
      {/* <XmtpHome /> */}
    </>
  );
}
