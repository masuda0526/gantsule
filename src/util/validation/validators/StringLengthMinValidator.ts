import { BaseValidationDecolator } from "../BaseValidationDecolator";
import type { IValidator } from "../ValidationTypes";

export class StringLengthMinValidator extends BaseValidationDecolator{
  message: string = '{attr}は{min}文字以上で入力してください。'
  min:number;

  constructor(decolator:IValidator, min:number){
    super(decolator);
    this.min = min;
  }

  validate(): boolean {
    if(this.value.length < this.min){
      return false;
    }
    return true;
  }

  getMessage(): string {
    return super.getMessage().replaceAll('{min}', this.min.toString());
  }
}