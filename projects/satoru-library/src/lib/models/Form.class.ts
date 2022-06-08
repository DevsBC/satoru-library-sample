import { Field } from "../interfaces/field.interface";

/** Use this class to build a dynamic form based on custom object */
export class Form {

  /** Name of animate (animate.style)
   * @example fadeIn | slideInUp
  */
  animation = 'animate__animated animated__';
  /** Field Appearance (Angular Material Form Field)
   * @example outline | fill
   */
  appearance: 'outline' | 'fill' | 'standard' = 'outline';
  /** Text displayed in send button */
  buttonText = 'Enviar';

  /** Object fields to display in UI */
  fields: Field[] = [];

  /** Object reference */
  object: any;

  constructor(formSettings?: Partial<Form>) {
    this.animation += formSettings?.animation || 'fadeIn';
    this.appearance = formSettings?.appearance || 'outline'
    this.buttonText = formSettings?.buttonText || 'Enviar';
    this.fields = formSettings?.fields || [];
    this.object = formSettings?.object || null;
  }
}