
  
/** Render a row with column */
export interface Column {
  /** Display name */
  name: string;
  /** Object property */
  property: string;
  /** For nested properties */
  displayedProperty?: string | null;
  /** Input type */
  type: 'email' | 'text' | 'number' | 'tel' | 'url' | 'file' | 'password' | 'search' | 'submit' | 'date' | 'time' | 'menu';
  /** HTML Element */
  element: 'input' | 'textarea' | 'select' | 'datepicker' | 'array' | 'autocomplete' | 'autocomplete-chips' | 'toggle';
  /** Custom Pipe for use in Generic Table */
  pipe: 'role' | 'eventName' | 'custom'| string | undefined;
  /** For hidden properties
   * @example id
   */
  hidden?: boolean
}

export interface ActionMenuItem {
  /** Text to display */
  label: string;
  /** Material Icon */
  icon: string;
  /** Name of function that will be handled by ActionService 
   * 
   * If includes https will be opened a link in a new tab
   * 
   * If includes / redirect to absolute path in router
   * 
   * Anything else can be a function name to handle in custom component
  */
  functionName: string;
  /** Property to be used in param routes*/
  property?: string;
  /**To handle changes in database on click rows in ActionMenu (optional if two objects has conflicts, see Item and Resource Model) */
  collectionName?: string;
}
  
  