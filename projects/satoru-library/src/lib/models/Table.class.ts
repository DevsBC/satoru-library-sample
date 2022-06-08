import { ActionMenuItem, Column } from "../interfaces/table-settings.interface";

export class Table {
  /** Name of animate (animate.style)
   * @example fadeIn | slideInUp
  */
  animation = 'animate__animated animate__';
  /** Table title */
  title = '';
  /** Paginator size */
  pageSize = '10';
  /** Table height */
  height = '400px';
  /** Row width */
  rowWidth = 200;
  /** Columns (derivated from Field) */
  columns: Column[];
  /** Array to render in table */
  array: any[];
  /** Action Menu to make actions over data */
  actionMenu?: ActionMenuItem[];

  /**
   * Initialize the table
   * @param data Table settings
   */
  constructor(data?: Partial<Table>) {
    this.array = data?.array || [];
    this.animation += data?.animation || 'fadeIn';
    this.title = data?.title || '';
    this.pageSize = data?.pageSize || this.pageSize;
    this.height = data?.height || this.height;
    this.rowWidth = data?.rowWidth || this.rowWidth;
    this.columns = data?.columns || [];
    if (data?.actionMenu) {
      this.actionMenu = data?.actionMenu;
      this.columns.push({ name: 'Acciones', property: '_actions', type: 'menu', pipe: undefined, element: 'input' });
    }
  }

}
