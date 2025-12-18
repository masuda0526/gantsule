import type { ErrorInfo } from "../../../util/validation/ValidationTypes";
import { store } from "../../../app/store";
import { setErrors } from "../../../app/ErrorReducer";

export const addErrors = (errors:ErrorInfo[]|undefined) => {
  if(errors){
    store.dispatch(setErrors({errors:errors}));
  }
}
