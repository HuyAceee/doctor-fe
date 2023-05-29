export interface IAction {
  name: string;
  handle: (id?: any) => void;
}
