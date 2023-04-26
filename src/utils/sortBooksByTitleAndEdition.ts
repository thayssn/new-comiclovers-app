import Book from "../types/Book";

export const sortBooksByTitleAndEdition = (arr: Book[]) => {
  return arr.sort((a, b) => {
    const titleComparison = a.title.localeCompare(b.title);
    if (titleComparison === 0) {
      return Number(a.edition) - Number(b.edition);
    }
    return titleComparison;
  });
};
