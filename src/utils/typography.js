export function capitalizeFirstLetter(str) {
  if (str.length <= 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAllWords(str) {
  let words = str.split(" ");
  return words
    .map((word) => {
      if (word.length <= 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
