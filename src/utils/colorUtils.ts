export const getFontColorBasedOnBackground = (hex: string): string => {
  const hexCode = hex.charAt(0) === "#" ? hex.slice(1, 7) : hex;

  const hexR = Number.parseInt(hexCode.slice(0, 2), 16);
  const hexG = Number.parseInt(hexCode.slice(2, 4), 16);
  const hexB = Number.parseInt(hexCode.slice(4, 6), 16);
  // Gets the average value of the colors
  const contrastRatio = (hexR + hexG + hexB) / (255 * 3);
  return contrastRatio >= 0.5 ? "black" : "white";
};
