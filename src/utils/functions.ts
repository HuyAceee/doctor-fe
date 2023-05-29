import { Buffer } from "buffer";
Buffer.from("anything", "base64");

export const checkArrayInvalid = (arr: string[]) => {
  const result = arr.find((i) => {
    return !i.trim();
  });
  return result;
};

export const convertImageFromBuffer = (data: any) => {
  const res = new Buffer(data, "base64").toString("binary");
  return res;
};
