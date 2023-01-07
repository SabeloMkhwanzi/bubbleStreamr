import React from "react";
import { Center, Box, Title, Text, createStyles } from "@mantine/core";
import { useLivepeerProvider } from "@livepeer/react";

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

export default function HeaderTitle() {
  const { classes } = useStyles();
  const provider = useLivepeerProvider();

  return (
    <Center>
      <Box>
        <Title className={classes.title}>
          Presenting a decentralized live streaming platform Powered by: <br />
          <Text component="span" inherit className={classes.highlight}>
            {provider.getConfig().name}
          </Text>
        </Title>
      </Box>
    </Center>
  );
}
