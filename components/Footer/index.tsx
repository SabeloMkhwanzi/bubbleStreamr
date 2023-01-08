import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import Link from "next/link";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons";
import { Petrona } from "@next/font/google";
import { Center } from "@mantine/core";

const petrona = Petrona({ weight: "500" });

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Center>
          <Text className={petrona.className}>
            © {new Date().getFullYear()} Design & developed 💚 by Sabelo
            Mkhwanazi
          </Text>
        </Center>
        <Group className={classes.links}>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/"
          >
            <Text className={petrona.className} transform="none">
              Home
            </Text>
          </Link>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/createStream"
          >
            <Text className={petrona.className}>Create Stream</Text>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/joinStream"
          >
            <Text className={petrona.className}>Join Stream</Text>
          </Link>
        </Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon
            color="#8892B0"
            component="a"
            href="https://github.com/SabeloMkhwanzi"
            target="_blank"
            variant="subtle"
          >
            <IconBrandGithub color="#00eb88" size={30} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href="https://twitter.com/SabeloMkhwanaz"
            target="_blank"
          >
            <IconBrandTwitter color="#00eb88" size={30} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href="https://www.linkedin.com/in/sabelo-mkhwanazi-54ba431b1/"
            target="_blank"
          >
            <IconBrandLinkedin color="#00eb88" size={30} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
