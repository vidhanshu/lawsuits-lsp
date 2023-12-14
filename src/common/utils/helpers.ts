export function APIResponse<T>(error: boolean, message: string, data: T) {
  return {
    error,
    message,
    data,
  };
}

export const stringShortener = (str: string, length: number) => {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }

  return str;
};

export const convertCommaSeparatedStringToArray = (str: string) =>
  str.split(",").map((item) => item.trim());
