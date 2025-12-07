import { BaseValidationDecolator } from "../BaseValidationDecolator"

export class StringLengthBetweenValidator extends BaseValidationDecolator{
  message: string = `{attr}は{min}〜{max}文字で入力してください。`
  min:number;
  max:number;
  constructor(field:string, value:string, attr:string, min:number, max:number){
    super(field, value, attr);
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