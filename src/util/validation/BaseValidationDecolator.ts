import type { ErrorInfo, IValidator } from "./ValidationTypes";

export abstract class BaseValidationDecolator implements IValidator{
  abstract message:string;
  decolator:IValidator;

  constructor(decolator:IValidator){
    this.decolator = decolator;
  }

  get field(){ return this.decolator.field }
  get value(){ return this.decolator.value }
  get attr(){ return this.decolator.attr }

  abstract validate(): boolean ;

  execute(errors:ErrorInfo[]): void {
    if(!this.validate()){
      errors.push(this.getError());
    }
    return this.decolator.execute(errors);
  }

  getMessage():string{
    return this.message.replaceAll('{attr}', this.attr);
  }

  setMessage(message:string, ...replaceValue:string[]):void{
    replaceValue.forEach((v, index) => {
      message = message.replaceAll(`{${index}}`, v);
    })
    this.message = message;
  }

  getError():ErrorInfo{
    return {field:this.field, message:this.getMessage()}
  } 
}