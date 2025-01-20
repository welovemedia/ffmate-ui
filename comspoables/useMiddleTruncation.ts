export const useMiddleTruncation = (input: string, length: number): string => {
  if (!input) {
    return ""
  }
  if (input.length <= length) {
    return input;
  }

  const ellipsis = "...";
  const partLength = Math.floor((length - ellipsis.length) / 2);

  const start = input.substring(0, partLength);
  const end = input.substring(input.length - partLength);

  return `${start}${ellipsis}${end}`;
};
