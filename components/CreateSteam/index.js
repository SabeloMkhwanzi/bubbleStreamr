import { Player, useCreateStream } from "@livepeer/react";
import { IconPlayerPlay } from "@tabler/icons";
import { useMemo, useState } from "react";
import moment from "moment";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

import {
  Flex,
  Box,
  Button,
  Text,
  Center,
  TextInput,
  createStyles,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
  Container,
  Accordion,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import HeroVideo from "../HeroVideo";
import { IconCopy, IconCheck } from "@tabler/icons";
import { showNotification, updateNotification } from "@mantine/notifications";
import HeaderTitle from "../HeaderTitle";
import PushChat from "../PushChat";
import { useAccount } from "wagmi";

import { Petrona } from "@next/font/google";

const petrona = Petrona({ weight: "variable" });

const useStyles = createStyles((theme) => ({
  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  title: {
    fontWeight: 800,
    fontSize: 30,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: "#00eb88",
  },

  item: {
    "&[data-hovered]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
}));

const PK = "dc2e4f6d8273ece57016aa2b17e115c6a70562e99989e3171f403ba4d499857b"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export default function CreateStream() {
  const { address } = useAccount();
  const { toggle, fullscreen } = useFullscreen();
  const { classes } = useStyles();
  const [streamName, setStreamName] = useState("");
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === "loading", [status]);

  const getEllipsisTxt = (str, n = 5) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  // Push Notification function
  const sendNotification = async () => {
    try {
      // apiResponse?.status === 204, if sent successfully!
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `BubbleStreamr - Presents: ${stream?.name}`,
          body: ``,
        },
        payload: {
          title: `BubbleStreamr - Presents: ${stream?.name}`,
          body: `Playback id: ${stream?.playbackId}  @ ${moment(
            stream.createdAt
          ).format("MMMM Do YYYY, h:mm:ss a")}`,
          cta: "",
          img: "",
        },

        channel: "eip155:5:0x67Ea839b012319B93319a2b13b08efB9bF18a6F3", // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      <HeaderTitle />
      <Center>
        <Box>
          <Text
            fz="xl"
            className={petrona.className}
            hidden={
              stream?.playbackId && (
                <Player
                  title={stream?.name}
                  playbackId={stream?.playbackId}
                  autoPlay
                  muted
                />
              )
            }
          >
            Engage with your audience by Creating a Stream and monetization
            niche
          </Text>
        </Box>
      </Center>
      <Center>
        <Box my={15}>
          <Box my={5}>
            <TextInput
              size="md"
              type="text"
              placeholder=" My Stream Name"
              onChange={(e) => setStreamName(e.target.value)}
              hidden={
                stream?.playbackId && (
                  <Player
                    title={stream?.name}
                    playbackId={stream?.playbackId}
                    autoPlay
                    muted
                  />
                )
              }
            />
          </Box>

          {stream?.playbackId && (
            <Player
              aspectRatio="16to9"
              title={stream?.name}
              playbackId={stream?.playbackId}
              autoPlay
              muted
            />
          )}

          <Flex>
            {!stream && (
              <Button
                rightIcon={
                  <IconPlayerPlay size={20} color="black" stroke={5} />
                }
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
                  leftIcon: {
                    marginRight: 15,
                  },
                })}
                onClick={() => {
                  createStream?.();
                }}
                disabled={isLoading || !createStream}
                variant="primary"
              >
                <Text
                  className={petrona.className}
                  fw={700}
                  fz="xl"
                  color="black"
                >
                  Create Stream
                </Text>
              </Button>
            )}
          </Flex>
          {stream && (
            <>
              <Container>
                <Group mt={10}>
                  <Tooltip
                    width={220}
                    multiline
                    transition="fade"
                    transitionDuration={300}
                    label="In-app notifications with details about your stream, including a PLAYBACK ID, will be sent to your views on the community channel when you click this button."
                    withArrow
                  >
                    <Button
                      fw={500}
                      fz="lg"
                      color="black"
                      className={petrona.className}
                      styles={(theme) => ({
                        root: {
                          backgroundColor: "#FF0057",
                          borderRadius: 10,
                          height: 42,
                          paddingLeft: 20,
                          paddingRight: 20,

                          "&:hover": {
                            backgroundColor: theme.fn.darken("#00eb88", 0.05),
                          },
                        },
                        leftIcon: {
                          marginRight: 15,
                        },
                      })}
                      onClick={() => {
                        sendNotification();
                        showNotification({
                          id: "load-data",
                          loading: true,
                          title: "Sending Push Notification to Channel",
                          message:
                            "Notification will be Send in 5 seconds, you cannot close this yet",
                          autoClose: false,
                          disallowClose: true,
                        });

                        setTimeout(() => {
                          updateNotification({
                            id: "load-data",
                            color: "teal",
                            title: "Notification was Sent",
                            message:
                              "Notification will close in 2 seconds, you can close this notification now",
                            icon: <IconCheck size={16} />,
                            autoClose: 4000,
                          });
                        }, 3000);
                      }}
                    >
                      <Text
                        className={petrona.className}
                        fw={700}
                        color="black"
                      >
                        Push Alerts
                      </Text>
                    </Button>
                  </Tooltip>

                  <Button
                    fw={500}
                    fz="lg"
                    className={petrona.className}
                    styles={(theme) => ({
                      root: {
                        backgroundColor: "#FF0057",
                        borderRadius: 10,
                        height: 42,
                        paddingLeft: 20,
                        paddingRight: 20,

                        "&:hover": {
                          backgroundColor: theme.fn.darken("#00eb88", 0.05),
                        },
                      },
                      leftIcon: {
                        marginRight: 15,
                      },
                    })}
                    onClick={toggle}
                    color={fullscreen ? "red" : "blue"}
                  >
                    {fullscreen ? "Exit" : "Fullscreen"}
                  </Button>

                  <Box py={15}>
                    <Group mx={10}>
                      <Box mx={10}>
                        <Text
                          styles={(theme) => ({
                            marginBottom: theme.spacing.sm * 1.5,
                          })}
                          fw={700}
                          ta="right"
                          className={petrona.className}
                          fz="xl"
                        >
                          · {stream.name}
                        </Text>
                      </Box>
                      <Box mx={10}>
                        <Text ta="right" className={petrona.className}>
                          {moment(stream.createdAt).calendar()}
                        </Text>
                      </Box>
                      <Box mx={10}>
                        <Text
                          color="blue"
                          ta="right"
                          className={petrona.className}
                        >
                          {getEllipsisTxt(address)}
                        </Text>
                      </Box>
                    </Group>
                  </Box>

                  <Box>
                    <PushChat />
                  </Box>
                </Group>

                <Accordion my={5}>
                  <Accordion.Item
                    className={classes.item}
                    value="reset-password"
                  >
                    <Accordion.Control>
                      <Text
                        fw={500}
                        tt="uppercase"
                        color="red.5"
                        className={petrona.className}
                      >
                        Useful information for your
                      </Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Group>
                        <Text className={petrona.className} fw={500}>
                          Stream Key:
                        </Text>
                        <Text>{stream.streamKey}</Text>
                        <CopyButton value={stream.streamKey} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                      <Group>
                        <Text className={petrona.className} fw={500}>
                          Playback Id:
                        </Text>
                        <Text>{stream.playbackId}</Text>
                        <CopyButton value={stream.playbackId} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                      <Group>
                        <Text className={petrona.className} fw={500}>
                          RTMP ingest URL:{" "}
                        </Text>
                        <Text>{getEllipsisTxt(stream.rtmpIngestUrl)}</Text>
                        <CopyButton value={stream.rtmpIngestUrl} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                      <Group>
                        <Text className={petrona.className} fw={500}>
                          Stream ID:
                        </Text>
                        <Text>{stream.id}</Text>
                        <CopyButton value={stream.id} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                      <Group>
                        <Text className={petrona.className} fw={500}>
                          Playback URL:
                        </Text>
                        <Text>{getEllipsisTxt(stream.playbackUrl)}</Text>
                        <CopyButton value={stream.playbackUrl} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Container>
            </>
          )}
        </Box>
      </Center>

      <Center
        hidden={
          stream?.playbackId && (
            <Player
              title={stream?.name}
              playbackId={stream?.playbackId}
              autoPlay
              muted
            />
          )
        }
      >
        <HeroVideo />
      </Center>
    </>
  );
}
