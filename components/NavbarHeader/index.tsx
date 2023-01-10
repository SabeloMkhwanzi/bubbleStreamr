import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import ColorModeButton from "../ColorModeButton";
import ConnectWallet from "../ConnectWallet";
import ProjectLogo from "../ProjectLogo";
import PushNotifiction from "../PushNotifiction";
import { Petrona } from "@next/font/google";

const petrona = Petrona({ weight: "500" });

const HEADER_HEIGHT = 90;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    boxShadow: theme.shadows.lg,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function NavbarHeader() {
  const { classes } = useStyles();

  return (
    <Header
      bg="transparent"
      sx={{ backdropFilter: "blur(5px)", borderBottom: 0 }}
      height={HEADER_HEIGHT}
      mb={120}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <ProjectLogo />
        </Group>
        <Group spacing={5} className={classes.links}>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className={petrona.className}>
                {" "}
                Home
              </Text>
            </Button>
          </Link>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/createStream"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className={petrona.className}>
                {" "}
                Create Stream
              </Text>
            </Button>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/joinStream"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className={petrona.className}>
                Join Stream
              </Text>
            </Button>
          </Link>
        </Group>

        <Group className={classes.linkLabel}>
          <PushNotifiction />
          <div className={classes.links}>
            <ColorModeButton />
          </div>
          <ConnectWallet />
        </Group>
      </Container>
    </Header>
  );
}
