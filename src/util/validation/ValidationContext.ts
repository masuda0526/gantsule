import type { ValidationBuilder } from "./ValidationBuilder";
import type { ErrorInfo } from "./ValidationTypes";

export class ValidationContext {
  
  errors:ErrorInfo[] = [];
  validators:ValidationBuilder[] = [];

  constructor(){

  }

  add(validationBuilder:ValidationBuilder){
    this.validators.push(validationBuilder);
  }

  validate(onlyRequire:boolean){
    this.resetErrors();
    this.validators.forEach(v => {
      v.validate(this.errors, onlyRequire);
    })
  }

  isError(){
    return this.errors.length > 0;
  }

  resetErrors(){
    this.errors = [];
  }

  getErrors(){
    return this.errors;
  }

  getErrorMsgs(){
    return this.errors.map(error => error.message);
  }

  getErrorMsgsForAlert(){
    return this.getErrorMsgs().join('\n');
  }
}