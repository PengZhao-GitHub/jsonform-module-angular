import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'app-jsonform',
  templateUrl: './jsonform.component.html',
  styleUrls: ['./jsonform.component.scss'],
})
export class JsonformComponent {

  @Input() schemaModel: any;
  @Output() completeEvent: EventEmitter<any> = new EventEmitter();

  // Parameters for the formly form
  form: FormGroup = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };
  fields: FormlyFieldConfig[] = [];

  constructor(private formlyJsonschema: FormlyJsonschema) {
  }

  ngOnInit() {
    this.iniitializeForm();
  }

  submit() {
    console.log("complete-model", this.model)
    console.log("complete-fields", this.fields)

    //alert(JSON.stringify(this.model));
    this.completeEvent.emit(this.model);
  }

  customFormatFields(fields: FormlyFieldConfig[]) {
    // Set the top level field to be a stepper
    fields[0].type = 'stepper';
    return fields;
  }


  modelChange(e: any) {
    console.log("click -> model chanage", e)
  }

  ngOnChanges() {
    this.iniitializeForm();
  }

  iniitializeForm() {
    this.form = new FormGroup({});
    this.options = {};
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schemaModel.schema)];
    this.model = this.schemaModel.model ? this.schemaModel.model : {};

    this.fields = this.customFormatFields(this.fields);

  }

}
