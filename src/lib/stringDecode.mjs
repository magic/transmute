export const stringDecode = str =>
  str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
