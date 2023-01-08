import React from "react";
import Image from "next/image";
import { createStyles } from "@mantine/core";
import Link from "next/link";
import { Box } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function ProjectLogo() {
  const { classes } = useStyles();

  return (
    <Link style={{ color: "inherit", textDecoration: "inherit" }} href="/">
      <Image
        src="/bubblestreamr-logo1.png"
        alt="13"
        width={200}
        height={70}
        priority
        className={classes.links}
      />
    </Link>
  );
}
