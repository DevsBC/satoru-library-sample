import { Validators } from "@angular/forms";
import { Field } from "projects/satoru-library/src/lib/interfaces/field.interface";
import { ActionMenuItem, Column } from "projects/satoru-library/src/lib/interfaces/table-settings.interface";
import { Form, Table } from "satoru-library";

export class Department {
  /** Department name */
  name: string | undefined;
  /** Description */
  description: string | undefined;
  /** Department head */
  head: string | undefined;

  /** ONLY CAN BE INITIALIZED IF PROPERTY ID EXISTS */
  constructor(data: any = {}) {
    this.set(data, this.getFields());
  }

  /** Override from ObjectData */
  public getFields() {
    const field = this.getDefaultField();
    const fields: Field[] = [
      {...field, property: 'id', name: 'id', hidden: true, validators: [] },
      { ...field, property: 'name', name: 'Nombre', dummyValue: 'Nuevo departamento', unique: true },
      { ...field, property: 'description', name: 'Descripción', element: 'textarea' },
      { ...field, property: 'head', name: 'Encargado', value: null, validators: [] },
    ];
    return fields;
  }

  public getForm() {
    return new Form({ fields: this.getFields(), object: this, appearance:'fill' });
  }

  /** Override from ObjectData */
  public getTable(array: any[]) {
    const tableSettings = this.getDefaultTableSettings(this.getFields());
    tableSettings.actionMenu?.push({
      label: 'Gestionar areas',
      icon: 'settings',
      functionName: 'workspacesManagement'
    });
    tableSettings.array = array;
    const table = new Table(tableSettings);
    return table;
  }


  public getDefaultTableSettings(fields: Field[]) {
    const getColumn = (f: Field) => (
      {
        name: f.name,
        property: f.property,
        type: f.type,
        displayedProperty: f.displayedProperty || null,
        pipe: f.pipe,
        hidden: f.hidden ?? false,
        element: f.element
      }
    );

    const columns: Column[] = fields.map(f => getColumn(f));
    const actionMenu: ActionMenuItem[] = [
      { label: 'Editar', icon: 'edit', functionName: 'edit',  },
    ];

    const tableSettings: any = {
      columns,
      actionMenu
    };

    return tableSettings;
  }
public set(data: any, fields: Field[]) {
    if (!data.id) { return; }
    const properties = this.getProperties(fields);
    const object: any = this;
    for (const key of properties) {
      let property = data[key];
      if (property) {
        if (property.seconds) {
          try {
            property = property.toDate();
          } catch (error) {
            property = new Date(property.seconds * 1000);
          }
        }
        object[key] = property;
      } else {
        delete object[key];
      }
    }
  }

  private getProperties(fields: Field[]) {
    return fields.map(f => f.property);
  }

  public getDefaultField() {
    const field: Field = {
      property: '',
      name: '',
      element: 'input',
      type: 'text',
      col: 100,
      placeholder: '',
      validators: [Validators.required]
    };
    return field;
  }

}
