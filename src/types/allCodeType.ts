export enum EAllCodeType {
  GENDER = "GENDER",
  ROLE = "ROLE",
  STATUS = "STATUS",
  TIME = "TIME",
  POSITION = "POSITION",
}

export interface ICode {
  id: string;
  keyMap: string;
  type: EAllCodeType;
  valueEn: string;
  valueVi: string;
}
