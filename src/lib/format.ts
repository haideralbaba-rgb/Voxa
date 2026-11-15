const nf = new Intl.NumberFormat("ar-EG");

/** Format a number with Arabic-Indic digits. */
export const ar = (n: number | string) =>
  typeof n === "number" ? nf.format(Math.round(n)) : n.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
