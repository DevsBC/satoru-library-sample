import { FormGroup } from '@angular/forms';

/** Interface for build a generic form */
export interface Field {
  /** Object property */
  property: string;
  /** Validators
   * @example [Validators.required, Validators.min(10)]
   */
  validators: any;
  /** Display name of the object property */
  name: string;
  /** Placeholder of element */
  placeholder: string;
  /** HTML Element */
  element: 'input' | 'textarea' | 'select' | 'datepicker';
  /** Length of column in grid */
  col: number;
  /** Textarea Rows */
  rows?: number;
  /** Input type */
  type: 'email' | 'text' | 'number' | 'tel' | 'url' | 'file' | 'password' | 'search' | 'submit' | 'date' | 'time';
  /** For disabled fields in form */
  disabled?: boolean;
  /* Available options (Select) */
  options?: OptionValue[];
  /** Options multiple (Select) */
  multiple?: boolean;
  /** Custom Callback */
  callback?: CallbackField | any;
  /** For nested objects */
  displayedProperty?: string;
  /** For default value */
  value?: any;
  /** For hidden field */
  hidden?: boolean
  /** A fake value for Dummy
  */
  dummyValue?: any;
  /** If unique the property will be checked before inserted in firestore */
  unique?: boolean;
  /** For using a Pipe to show value */
  pipe?: string;
}

interface CallbackField {
  /** HTML Event */
  event: 'click' | 'keyup';
  /** Custom Function
   * @example (e) => console.log(e)
   */
  function: (o: any, form?: FormGroup) => any;
}

export interface OptionValue {
  name: string;
  value: any;
}

