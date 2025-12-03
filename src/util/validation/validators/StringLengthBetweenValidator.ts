import { BaseValidationDecolator } from "../BaseValidationDecolator"
import type { IValidator } from "../ValidationTypes"

export class StringLengthBetweenValidator extends BaseValidationDecolator{
  message: string = `{attr}は{min}〜{max}文字で入力してください。`
  min:number;
  max:number;
  constructor(decolator:IValidator, min:number, max:number){
    super(decolator);
    this.min = min;
    this.max = max;
  }
  validate(): boolean {
    const len =this.value.length;
    if(len < this.min || this.max < len){
      return false;
    }
    return true;
  }

  getMessage(): string {
    return super.getMessage().replaceAll('{min}', this.min.toString()).replaceAll('{max}', this.max.toString());
  }
}