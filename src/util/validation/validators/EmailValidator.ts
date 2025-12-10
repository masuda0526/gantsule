import { BaseValidationDecolator } from "../BaseValidationDecolator";

export class EmailValidator extends BaseValidationDecolator{
  message: string = 'メールアドレス形式ではありません。';
  regexp = new RegExp('^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$');

  constructor(field:string, value:string, attr:string) {
    super(field, value, attr);
  }

  validate(): boolean {
    return this.regexp.test(this.value)
  }
}