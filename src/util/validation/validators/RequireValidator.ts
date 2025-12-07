import { BaseValidationDecolator } from "../BaseValidationDecolator";

export class RequireValidator extends BaseValidationDecolator{
  message: string = '{attr}は必須項目です。';

  constructor(field:string, value:string, attr:string){
    super(field, value, attr);
  }

  validate(): boolean {
    if(this.value === '' || this.value === undefined || this.value === null){
      return false;
    }
    return true;
  }
}