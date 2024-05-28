export function isValidDateFormat(inputString: string) {
  // Define the regex pattern for DD-MM-YYYY format
  const datePattern = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;

  // Check if the input string matches the pattern
  return datePattern.test(inputString);
}
