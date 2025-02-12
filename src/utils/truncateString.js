export function truncateString(str) {
    return str.length > 11 ? str.slice(0, 7) + "............" + str.slice(-4) : str;
  }