import type { ErrorInfo, IValidator } from "./ValidationTypes";

export class BaseValidator implements IValidator{
  field:string;
  value:string;
  attr:string;
  constructor(field:string, value:string, attr:string){
    this.field = field;
    this.value = value;
    this.attr = attr;
  }
  validate(): boolean {
    return true;
  }
  execute(errors:ErrorInfo[]): void {
    if(!this.validate()){
      const err = this.getError();
      if(err) errors.push(err);
    }
  }
  getError(): ErrorInfo | null {
    return null;
  }
} 