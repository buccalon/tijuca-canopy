import { styled } from "@styles/stitches";

const MapStyled = styled("div", {
  height: "80vh",
  position: "relative",
  zIndex: "0",

  ".map-container": {
    height: "100%",
    width: "100%",
    figure: {
      width: "100%",
      margin: "0",
      padding: "0",
    },
  },

  figure: {
    img: {
      width: "200px",
      maxHeight: "150px",
    },
    video: {
      display: "none",
    },
  },
});

export { MapStyled };
