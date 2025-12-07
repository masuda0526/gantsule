import type { BaseValidationDecolator } from "./BaseValidationDecolator";
import type { ErrorInfo, IValidator } from "./ValidationTypes";
import { DateFormatValidator, type DateFormat } from "./validators/DateFormatValidator";
import { ExistDateValidator } from "./validators/ExistDateValidator";
import { RequireValidator } from "./validators/RequireValidator";
import { StringLengthBetweenValidator } from "./validators/StringLengthBetweenValidator";
import { StringLengthMaxValidator } from "./validators/StringLengthMaxValidator";
import { StringLengthMinValidator } from "./validators/StringLengthMinValidator";

export class ValidationBuilder{

  field:string;
  value:string;
  attr:string;
  requireVaidators:IValidator[];
  attrValidators:IValidator[];

  constructor(field:string, value:string, attr:string){
    this.field = field;
    this.value = value;
    this.attr = attr;
    // const base = new BaseValidator(this.field, this.value, this.attr);
    this.requireVaidators = [];
    this.attrValidators = [];
  }

  validate(errors:ErrorInfo[], onlyRequire:boolean){
    this.requireValidate(errors);
    if(!onlyRequire && errors.length === 0){
      this.attrValidate(errors);
    }
  }

  requireValidate(errors:ErrorInfo[]){
    this.requireVaidators.forEach(v => {
      v.execute(errors);
    })
  }

  attrValidate(errors:ErrorInfo[]){
    this.attrValidators.forEach(v => {
      v.execute(errors)
    })
  }

  /////////////////////////
  // 必須チェック用
  /////////////////////////

  require(message?:string, ...texts:string[]){
    const v = new RequireValidator(this.field, this.value, this.attr);
    this.setMessage(v, message, ...texts);
    this.requireVaidators.push(v)
    return this;
  }


  /////////////////////////
  // 属性チェック用
  /////////////////////////
  txtbetween(min:number, max:number, message?:string, ...texts:string[]){
    const v = new StringLengthBetweenValidator(this.field, this.value, this.attr, min, max);
    this.setMessage(v, message, ...texts);
    this.attrValidators.push(v);
    return this;
  }

  txtmin(min:number, message?:string, ...texts:string[]){
    const v = new StringLengthMinValidator(this.field, this.value, this.attr, min);
    this.setMessage(v, message, ...texts);
    this.attrValidators.push(v);
    return this;
  }

  txtmax(max:number, message?:string, ...texts:string[]){
    const v = new StringLengthMaxValidator(this.field, this.value, this.attr, max);
    this.setMessage(v, message, ...texts);
    this.attrValidators.push(v);
    return this
  }

  dateformat(type:DateFormat, message?:string, ...texts:string[]){
    const v = new DateFormatValidator(this.field, this.value, this.attr, type);
    this.setMessage(v, message, ...texts);
    this.attrValidators.push(v);
    return this
  }

  existdate(message?:string, ...texts:string[]){
    const v = new ExistDateValidator(this.field, this.value, this.attr);
    this.setMessage(v, message, ...texts);
    this.attrValidators.push(v);
    return this
  }

  /**
   * オーバライドメッセージがあれば更新
   */
  setMessage(validator:BaseValidationDecolator, message?:string, ...texts:string[]){
    if(message){
      validator.setMessage(message, ...texts);
    }
  }
}