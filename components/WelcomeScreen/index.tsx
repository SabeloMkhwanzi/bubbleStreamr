import { createStyles, Container, Center } from "@mantine/core";
import SvgLogo from "../SvgLogo";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 120,
    backgroundColor: "#0A1A2F",
    position: "relative",
    height: "100vh",
    width: "100%",
  },
}));

export default function WelcomeScreen() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Center
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            left: "0px",
            top: "0px",
          }}
        >
          <SvgLogo />
        </Center>
      </Container>
    </div>
  );
}
