import { BaseValidationDecolator } from "../BaseValidationDecolator";
import type { IValidator } from "../ValidationTypes";

export class RequireValidator extends BaseValidationDecolator{
  message: string = '{attr}は必須項目です。';

  constructor(decolator:IValidator){
    super(decolator);
  }

  validate(): boolean {
    if(this.value === '' || this.value === undefined || this.value === null){
      return false;
    }
    return true;
  }
}