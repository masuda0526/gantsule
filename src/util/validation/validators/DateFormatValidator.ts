import { BaseValidationDecolator } from "../BaseValidationDecolator";

export type DateFormat = 'nosep' | 'hypfen' | 'slash' | 'kanji'

type DatePatternSet = Record<DateFormat, { regexp: string, format: string, example: string }>

export class DateFormatValidator extends BaseValidationDecolator {

  message = '{attr}は{format}形式で入力してください。（例：{example}）';

  type: DateFormat;


  patterns: DatePatternSet = {
    nosep: {
      regexp: "^[0-9]{8}$",
      format: "yyyymmdd",
      example: '20250118',
    },
    hypfen: {
      regexp: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
      format: 'yyyy-mm-dd',
      example: '2025-01-18'
    },
    slash: {
      regexp: "^[0-9]{4}/[0-9]{2}/[0-9]{2}$",
      format: 'yyyy/mm/dd',
      example: '2025/01/18'
    },
    kanji: {
      regexp: "^[0-9]{4}年[0-9]{1,2}月[0-9]{1,2}日$",
      format: 'yyyy年m月d日',
      example: '2025年1月18日'
    }
  }

  constructor(field:string, value:string, attr:string, type: DateFormat) {
    super(field, value, attr);
    this.type = type;
  }

  validate(): boolean {
    const regexp = new RegExp(this.patterns[this.type].regexp);
    return regexp.test(this.value);
  }

  getMessage(): string {
    return super.getMessage()
      .replaceAll('{format}', this.patterns[this.type].format)
      .replaceAll('{example}', this.patterns[this.type].example);
  }
}