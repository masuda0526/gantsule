import { BaseValidationDecolator } from "../BaseValidationDecolator";

export class StringLengthMaxValidator extends BaseValidationDecolator{
  message: string = '{attr}は{max}文字以内で入力してください。';
  max:number
  constructor(field:string, value:string, attr:string, max:number){
    super(field, value, attr);
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