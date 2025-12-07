import { ValidationBuilder } from "./ValidationBuilder";
import type { DateFormat } from "./validators/DateFormatValidator";

export class ValidatorStringParser {
  
  RULE_SEPARATOR:string = '|'
  OPTION_SEPARATOR:string = ':'
  DEBUG_FLG = true;
  field:string;
  value:string;
  attr:string;
  rules:string[];
  validationBuilder : ValidationBuilder;
  constructor (field:string, value:string, attr:string, rules:string){
    this.field = field;
    this.value = value;
    this.attr = attr;
    this.validationBuilder = new ValidationBuilder(this.field, this.value, this.attr);
    this.rules = this.separateRules(rules);
  }

  build(){
    for(const rule of this.rules){
      const vtype = this.extractRules(rule);
      const options = this.extractOptions(rule);

      if(vtype === 'require'){
        this.validationBuilder = this.validationBuilder.require()
      }
      
      if(vtype === 'txtmin'){
        this.validationBuilder = this.validationBuilder.txtmin(Number.parseInt(options[0]))
      }

      if(vtype === 'txtmax'){
        this.validationBuilder = this.validationBuilder.txtmax(Number.parseInt(options[0]))
      }

      if(vtype === 'txtbetween'){
        this.validationBuilder = this.validationBuilder.txtbetween(Number.parseInt(options[0]), Number.parseInt(options[1]))
      }

      if(vtype === 'dateformat'){
        this.validationBuilder = this.validationBuilder.dateformat(options[0] as DateFormat);
      }

      if(vtype === 'existdate'){
        this.validationBuilder = this.validationBuilder.existdate();
      }
    }
    return this.validationBuilder;
  }

  separateRules(rules:string){
    const arr = rules.split(this.RULE_SEPARATOR);
    return arr;
  }

  isApply(arrayOfRules:string[], validType:string){
    for(const rule of arrayOfRules){
      const l = rule.split(this.OPTION_SEPARATOR);
      if(l.shift() === validType){
        return true;
      }
    }
    return false;
  }

  extractRules(rule:string){
    return rule.split(this.OPTION_SEPARATOR).shift();
  }

  extractOptions(rule:string){
    const arr = rule.split(this.OPTION_SEPARATOR);
    if(arr.length < 2)return [];
    arr.shift();
    return arr;
  }
}