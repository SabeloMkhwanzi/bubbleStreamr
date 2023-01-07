import { Player, useCreateStream, useLivepeerProvider } from "@livepeer/react";
import { IconPlayerPlay } from "@tabler/icons";
import { useMemo, useState } from "react";
import moment from "moment";

import {
  Flex,
  Box,
  Button,
  Text,
  Center,
  TextInput,
  createStyles,
  Title,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
  Container,
  Badge,
  List,
  ThemeIcon,
} from "@mantine/core";
import HeroVideo from "../HeroVideo";
import { IconCopy, IconCheck, IconCircleCheck } from "@tabler/icons";
import HeaderTitle from "../HeaderTitle";

const useStyles = createStyles((theme) => ({
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

export default function CreateStream() {
  const { classes } = useStyles();
  const provider = useLivepeerProvider();
  const [streamName, setStreamName] = useState("");
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === "loading", [status]);

  const getEllipsisTxt = (str, n = 10) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  return (
    <>
      <HeaderTitle />
      <Center>
        <Box>
          <Text
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
                Create Stream
              </Button>
            )}
          </Flex>

          {stream && (
            <>
              <Container miw={800}>
                <Box py={15}>
                  <Group mx={10}>
                    <Box mx={10}>
                      <Text fw={500} ta="right" color="white">
                        {stream.name}
                      </Text>
                    </Box>
                    <Box mx={10}>
                      <Text>
                        {moment(stream.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Text>
                    </Box>
                    <Box mx={10}>
                      <Badge>{stream.isActive}</Badge>
                    </Box>
                  </Group>
                </Box>
                <Text my={10} td="underline" fz="lg" fw={500}>
                  Useful information for your
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <IconCircleCheck size={16} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>
                    <Group>
                      <Text fw={500}>Stream Key:</Text>
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
                  </List.Item>
                  <List.Item>
                    <Group>
                      <Text fw={500}>Playback Id:</Text>
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
                  </List.Item>
                  <List.Item>
                    <Group>
                      <Text fw={500}>RTMP ingest URL: </Text>
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
                  </List.Item>
                  <List.Item>
                    <Group>
                      <Text fw={500}>Stream ID:</Text>
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
                  </List.Item>
                  <List.Item>
                    <Group>
                      <Text fw={500}>Playback URL: </Text>
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
                  </List.Item>
                </List>
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
