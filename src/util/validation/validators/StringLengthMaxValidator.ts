import { BaseValidationDecolator } from "../BaseValidationDecolator";
import type { IValidator } from "../ValidationTypes";

export class StringLengthMaxValidator extends BaseValidationDecolator{
  message: string = '{attr}は{max}文字以内で入力してください。';
  max:number
  constructor(decolator:IValidator, max:number){
    super(decolator);
    this.max = max;
  }

  validate(): boolean {
    if(this.max < this.value.length){
      return false
    }
    return true;
  }

  getMessage(): string {
    return super.getMessage().replaceAll('{max}', this.max.toString());
  }
}