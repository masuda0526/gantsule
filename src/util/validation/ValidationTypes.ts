export interface IValidator{
  field:string;
  value:string;
  attr:string;
  validate():boolean
  execute(errors:ErrorInfo[]):void;
  getError():ErrorInfo|null;
}

export type ErrorInfo = {
  field:string;
  message:string;
}
