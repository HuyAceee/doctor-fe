export const checkArrayInvalid = (arr: string[]) => {
  const result = arr.find((i) => {
    return !i.trim();
  });
  return result;
};
