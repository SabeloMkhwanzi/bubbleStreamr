import {
  Title,
  Text,
  Container,
  Button,
  Image,
  createStyles,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";
import Link from "next/link";
import ReactRotatingText from "react-rotating-text";
import HeroVideo from "../HeroVideo";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 800,
    fontSize: 40,
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

  description: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },

  ratateText: {
    animation:
      "blinking-cursor 0.8s cubic-bezier(0.68, 0.01, 0.01, 0.99) 1000s infinite",
    fontSize: 40,

    "@keyframes blinking-cursor": {
      "0%": {
        opacity: 0,
      },
      "50%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },
  },
}));

export default function HeroPage() {
  const { classes, cx } = useStyles();

  return (
    <>
      <div>
        <Title className={classes.title}>
          A decentralized live streaming platform thats <br />
          allows you to upload and broadcast video content:{" "}
          <Text component="span" inherit className={classes.highlight}>
            <ReactRotatingText
              className={classes.ratateText}
              color="#00eb88"
              items={[
                "Film/TV.",
                "Publishers.",
                "Broadcasters.",
                "eLearning.",
                "Advertisers.",
                "Sports.",
                "News",
              ]}
            />
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Engaging with your audience in real time — we’re talking live
            streams. we offer you a platform to host and stream your content and
            everything you need to monetization niche.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="explore"
          >
            <Button
              className={classes.control}
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
              Get started
            </Button>
          </Link>
        </div>
        <div>
          <HeroVideo />
        </div>
      </div>
    </>
  );
}
