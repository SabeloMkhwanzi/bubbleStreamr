import { Player } from "@livepeer/react";
import { Container, createStyles } from "@mantine/core";
import Image from "next/image";

const playbackId =
  "bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy";

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
    <Container size="xl" px={10} my="5em" className={classes.Paper}>
      <Player
        autoPlay
        loop
        title="Waterfalls"
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
