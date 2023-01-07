import { Player } from "@livepeer/react";
import { Container, createStyles } from "@mantine/core";
import Image from "next/image";

const playbackId =
  "bafybeickrmzg5hsvokjjsev5chfwksfsh7yckzggdtzkvfh6rnejm3dfua";

//import blenderPoster from "../../public/images/blender-poster.png";

// const PosterImage = () => {
//   return (
//     // eslint-disable-next-line jsx-a11y/alt-text
//     <Image src={blenderPoster} alt="video" priority placeholder="blur" />
//   );
// };

const useStyles = createStyles((theme) => ({
  Paper: {
    boxShadow: theme.shadows.lg,
  },
}));

export default function HeroVideo() {
  const { classes } = useStyles();
  return (
    <Container size="xl" px={8} my="5em" className={classes.Paper}>
      <Player
        autoPlay
        loop
        title="BubbleStreaamr Ad"
        playbackId={playbackId}
        showPipButton
        showTitle={false}
        aspectRatio="16to9"
        //poster={<PosterImage />}
        controls={{
          autohide: 100000,
        }}
        theme={{
          borderStyles: { containerBorderStyle: "hidden" },
          radii: { containerBorderRadius: "10px" },
        }}
      />
    </Container>
  );
}
