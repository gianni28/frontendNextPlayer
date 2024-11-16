export const formatValue = (number) => {
    if (number >= 1_000_000) {
      return `${(number / 1_000_000).toFixed(2).replace(".", ",")} mill. €`;
    } else if (number >= 1_000) {
      return `${(number / 1_000).toFixed(0)} mil €`;
    }
    return `${number} €`; // Para valores menores a 1.000
};
  