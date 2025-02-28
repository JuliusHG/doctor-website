import { hexToHSL } from "../utils/colorConversion"

export const hexColors = {
  "dw-dark": "#3C3C44",
  "dw-darker": "#1E363E",
  "dw-soft": "#6DC5E4",
  "dw-softer": "#95D5EB",
  "dw-white": "#FFFFFF",
}

export const hslColors = Object.fromEntries(Object.entries(hexColors).map(([key, value]) => [key, hexToHSL(value)]))

export const colorVariables = {
  "dw-dark": "240 7% 25%",
  "dw-darker": "197 34% 18%",
  "dw-soft": "196 68% 66%",
  "dw-softer": "196 68% 75%",
  "dw-white": "0 0% 100%",
}

export const filterValues = {
  "dw-dark": "invert(22%) sepia(8%) saturate(634%) hue-rotate(202deg) brightness(94%) contrast(87%)",
  "dw-darker": "invert(18%) sepia(23%) saturate(669%) hue-rotate(155deg) brightness(94%) contrast(90%)",
  "dw-soft": "invert(80%) sepia(10%) saturate(1095%) hue-rotate(157deg) brightness(93%) contrast(90%)",
  "dw-softer": "invert(87%) sepia(8%) saturate(523%) hue-rotate(157deg) brightness(103%) contrast(95%)",
  "dw-white": "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
}

