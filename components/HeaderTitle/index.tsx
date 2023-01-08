import { Center, Box, Title, Text, createStyles } from "@mantine/core";
import { useLivepeerProvider } from "@livepeer/react";
import { Fredoka_One, Petrona } from "@next/font/google";

const petrona = Petrona({ weight: "variable" });
const fredokaOne = Fredoka_One({ weight: "400" });

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-hovered]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
}));

export default function HeaderTitle() {
  const provider = useLivepeerProvider();

  return (
    <Center>
      <Box>
        <Title
          className={fredokaOne.className}
          styles={(theme) => ({
            title: {
              fontWeight: 900,
              fontSize: 35,
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
          })}
        >
          Presenting a decentralized live streaming platform Powered by: <br />
          <Center>
            <Text
              fw={700}
              fs="xl"
              component="span"
              inherit
              className={petrona.className}
              sx={{
                color: "#00eb88",
              }}
            >
              {provider.getConfig().name}
            </Text>
          </Center>
        </Title>
      </Box>
    </Center>
  );
}
