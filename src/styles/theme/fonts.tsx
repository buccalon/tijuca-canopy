export const dm_sans = "Montserrat, sans-serif";
export const dm_serif_display = "Noto Serif, serif";

export const GoogleFontImport = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    ></link>
  </>
);

const sans = `var(--canopy-sans-font)`;
const display = `var(--canopy-display-font)`;

const fonts = {
  sans,
  display,
};

export default fonts;
