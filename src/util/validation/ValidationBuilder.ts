import type { BaseValidationDecolator } from "./BaseValidationDecolator";
import { BaseValidator } from "./BaseValidator";
import type { ErrorInfo, IValidator } from "./ValidationTypes";
import { RequireValidator } from "./validators/RequireValidator";
import { StringLengthBetweenValidator } from "./validators/StringLengthBetweenValidator";
import { StringLengthMaxValidator } from "./validators/StringLengthMaxValidator";
import { StringLengthMinValidator } from "./validators/StringLengthMinValidator";

export class ValidationBuilder{

  field:string;
  value:string;
  attr:string;
  requireVaidator:IValidator;
  attrValidator:IValidator;

  constructor(field:string, value:string, attr:string){
    this.field = field;
    this.value = value;
    this.attr = attr;
    const base = new BaseValidator(this.field, this.value, this.attr);
    this.requireVaidator = base;
    this.attrValidator = base;
  }

  validate(errors:ErrorInfo[], onlyRequire:boolean){
    this.requireVaidator.execute(errors);
    if(!onlyRequire && errors.length === 0){
      this.attrValidator.execute(errors);
    }
  }

  /////////////////////////
  // 必須チェック用
  /////////////////////////

  require(message?:string, ...texts:string[]){
    const v = new RequireValidator(this.requireVaidator);
    this.setMessage(v, message, ...texts);
    this.requireVaidator = v
    return this;
  }


  /////////////////////////
  // 属性チェック用
  /////////////////////////
  txtbetween(min:number, max:number, message?:string, ...texts:string[]){
    const v = new StringLengthBetweenValidator(this.attrValidator, min, max);
    this.setMessage(v, message, ...texts);
    this.attrValidator = v;
    return this;
  }

  txtmin(min:number, message?:string, ...texts:string[]){
    const v = new StringLengthMinValidator(this.attrValidator, min);
    this.setMessage(v, message, ...texts);
    this.attrValidator = v;
    return this;
  }

  txtmax(max:number, message?:string, ...texts:string[]){
    const v = new StringLengthMaxValidator(this.attrValidator, max);
    this.setMessage(v, message, ...texts);
    this.attrValidator = v;
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