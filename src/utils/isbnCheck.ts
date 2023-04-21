// Checks for ISBN-10 or ISBN-13 format
const regex =
  /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?:[0-9]+[- ]){3}[0-9X]{13}$|97[89][0-9]{10}$|(?:[0-9]+[- ]){4}[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

export function validateISBN(subject: string) {
  if (regex.test(subject)) {
    const chars: string[] = subject
      .replace(/[- ]|^ISBN(?:-1[03])?:?/g, "")
      .split("");
    const last: string = chars.pop();
    let sum: number = 0;
    let check: string | number;
    let i: number;

    if (chars.length == 9) {
      chars.reverse();
      for (i = 0; i < chars.length; i++) {
        sum += (i + 2) * parseInt(chars[i], 10);
      }
      check = 11 - (sum % 11);
      if (check == 10) {
        check = "X";
      } else if (check == 11) {
        check = "0";
      }
    } else {
      for (i = 0; i < chars.length; i++) {
        sum += ((i % 2) * 2 + 1) * parseInt(chars[i], 10);
      }
      check = 10 - (sum % 10);
      if (check == 10) {
        check = "0";
      }
    }

    if (check == last) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
