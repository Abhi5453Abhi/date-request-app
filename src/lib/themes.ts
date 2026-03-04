export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;
    backgroundGradient: string;
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    accent: string;
    card: string;
    cardBorder: string;
  };
}

export const themes: Theme[] = [
  {
    id: "romantic-rose",
    name: "Romantic Rose",
    description: "Soft pinks and reds for a classic romantic feel",
    colors: {
      background: "#FFF5F5",
      backgroundGradient: "linear-gradient(135deg, #FFF5F5 0%, #FED7D7 50%, #FEB2B2 100%)",
      primary: "#E53E3E",
      secondary: "#FC8181",
      text: "#742A2A",
      textMuted: "#C53030",
      accent: "#F687B3",
      card: "rgba(255, 255, 255, 0.8)",
      cardBorder: "#FEB2B2",
    },
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Calming blues and teals like a peaceful ocean",
    colors: {
      background: "#E6FFFA",
      backgroundGradient: "linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 50%, #81E6D9 100%)",
      primary: "#319795",
      secondary: "#4FD1C5",
      text: "#234E52",
      textMuted: "#2C7A7B",
      accent: "#76E4F7",
      card: "rgba(255, 255, 255, 0.8)",
      cardBorder: "#81E6D9",
    },
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm oranges and golds like a sunset",
    colors: {
      background: "#FFFAF0",
      backgroundGradient: "linear-gradient(135deg, #FFFAF0 0%, #FEEBC8 50%, #FBD38D 100%)",
      primary: "#DD6B20",
      secondary: "#F6AD55",
      text: "#7B341E",
      textMuted: "#C05621",
      accent: "#F6E05E",
      card: "rgba(255, 255, 255, 0.8)",
      cardBorder: "#FBD38D",
    },
  },
  {
    id: "midnight-love",
    name: "Midnight Love",
    description: "Deep purples and navy for a mysterious vibe",
    colors: {
      background: "#FAF5FF",
      backgroundGradient: "linear-gradient(135deg, #FAF5FF 0%, #E9D8FD 50%, #D6BCFA 100%)",
      primary: "#805AD5",
      secondary: "#9F7AEA",
      text: "#44337A",
      textMuted: "#6B46C1",
      accent: "#F687B3",
      card: "rgba(255, 255, 255, 0.8)",
      cardBorder: "#D6BCFA",
    },
  },
];

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}
