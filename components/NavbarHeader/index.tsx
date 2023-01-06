import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlay } from "@tabler/icons";
import Link from "next/link";
import ColorModeButton from "../ColorModeButton";
import ProjectLogo from "../ProjectLogo";

const HEADER_HEIGHT = 80;

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
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <ProjectLogo />
        </Group>
        <Group spacing={5} className={classes.links}>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/explore"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              Explore
            </Button>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/publish"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              Publish
            </Button>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/createStream"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              Create Stream
            </Button>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/joinStream"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              Join Stream
            </Button>
          </Link>
        </Group>

        <Group className={classes.linkLabel}>
          <div className={classes.links}>
            <ColorModeButton />
          </div>
          <Button
            rightIcon={<IconPlayerPlay size={20} color="black" stroke={5} />}
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
          >
            Connect to Bubble
          </Button>
        </Group>
      </Container>
    </Header>
  );
}

//color = "#00eb88";
