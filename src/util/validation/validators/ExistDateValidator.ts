import { BaseValidationDecolator } from "../BaseValidationDecolator";

export class ExistDateValidator extends BaseValidationDecolator {
  message: string = '{attr}を確認してください。';

  constructor(field:string, value:string, attr:string) {
    super(field, value, attr);
    console.log(this)
  }

  validate(): boolean {
    if (!this.isExist()) {
      return false
    }

    if (!this.isFebCheck()) {
      return false;
    }

    return true;
  }

  isExist() {
    const dt = new Date(this.value);
    return !isNaN(dt.getDate());
  }

  /**
   * 2月などは2025-02-31などを入力してもエラーとならないため
   * @returns 存在する日付かどうか
   */
  isFebCheck() {
    const dt = new Date(this.value);

    const [y, m, d] = this.value.split('-').map(v => Number(v));

    return (
      dt.getFullYear() === y &&
      dt.getMonth() + 1 === m &&
      dt.getDate() === d
    );
  }
}