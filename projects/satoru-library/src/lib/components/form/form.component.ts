import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContextService } from '../../services/context.service';
import { Field } from '../../interfaces/field.interface';
import { Form } from '../../models/Form.class';

@Component({
  selector: 'sat-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() form = new Form();
  @Output() formEmitter = new EventEmitter();

  formGroup!: FormGroup;
  loading = false;
  showForm = true;
  context: string;

  constructor(private formBuilder: FormBuilder, private contextService: ContextService) { 
    this.context = this.contextService.getContext();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.getForm());    
  }

  setDummyData() {
    setTimeout(() => this.showForm = false);
    this.formGroup = this.formBuilder.group(this.getForm(true));
    setTimeout(() => this.showForm = true);
  }

  async onSubmit(): Promise<void> {
    const controls = this.formGroup.controls; // form.value has not all object properties, bug?
    let values: any = {};
    for (const [k, v] of Object.entries(controls)) {
      const key = k as string;
      let value = v.value as any;
      if (value) {
        /** Currently Angular FormGroup has issues with type="number" */
        const field = this.form.fields.find(f => f.property === key);
        if (field!.type === 'number') {
          value = Number(value);
        }
        values[key] = value;
      }
    }
    console.log(values);
    this.formEmitter.emit(values);
   
  }

  compareItems(a: any, b: any) {
    return a?.id && b?.id ? a.id === b.id : a === b;
  }

  private getForm(getDummyData = false): any {
    const formGroup: any = {};
    const getThisValue = (f: Field) => f.value || this.form.object[f.property];
    for (const field of this.form.fields) {
      let value = getDummyData ? this.getDummyValue(field) : getThisValue(field);
      formGroup[field.property] = [
        { 
          value, 
          disabled: field?.disabled ?? false 
        },
        field.validators
      ];
    }
    return formGroup;
  }

  private getDummyValue(field: Field) {
    let response: any;
    if (field.type === 'date' || field.element === 'select') {
      if (field.type == 'date') {
        response = new Date();
      } else {
        response = field.multiple ? field.options?.map(o => o.value) : field?.value || field.options?.[0].value;
      }
    } else if (field.property === 'id') {
      response = '';
    } else {
      response = field.dummyValue || 'Undefined value for: ' + field.property;
    }
    return response;
  }


}
