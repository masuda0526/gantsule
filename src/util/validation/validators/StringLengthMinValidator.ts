import { BaseValidationDecolator } from "../BaseValidationDecolator";

export class StringLengthMinValidator extends BaseValidationDecolator{
  message: string = '{attr}は{min}文字以上で入力してください。'
  min:number;

  constructor(field:string, value:string, attr:string, min:number){
    super(field, value, attr);
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