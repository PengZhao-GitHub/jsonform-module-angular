import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Subject } from 'rxjs';

import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-jsonform',
  templateUrl: './jsonform.component.html',
  styleUrls: ['./jsonform.component.scss'],
})
export class JsonformComponent {

  @Input() schemaModel: any;

  // private destroy$: Subject<any> = new Subject<any>();

  // Parameters for the formly form
  form: FormGroup = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };
  fields: FormlyFieldConfig[] = [];

  constructor(private formlyJsonschema: FormlyJsonschema, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.iniitializeForm();
  }

  submit() {
    console.log("submit-model", this.model)
    console.log("submit-fields", this.fields)

    //alert(JSON.stringify(this.model));
  }

  public ngOnDestroy(): void {
    // this.destroy$.next(true);
    // this.destroy$.complete();
  }


  customFormatFields(fields: FormlyFieldConfig[]) {
    console.log("formatQuoteFields", fields)

    fields[0].type = 'stepper';

    fields[0].fieldGroup?.forEach(f => {
      if (f.key === 'risk') {
        console.log("riskField", f)

        const elements = document.querySelector('formly-array-type');
        elements?.childNodes.forEach((element: any) => {
          //change background color to red
          console.log("element", element)

          //change background color to red
          element.style.backgroundColor = 'red';

        })
      }
    })

    return fields;
  }


  modelChange(e: any) {
    console.log("click -> model chanage", e)
  }

  ngOnChanges() {
    this.iniitializeForm();
  }

  iniitializeForm() {
    console.log("********* Initialize Form **************", this.schemaModel)
    this.form = new FormGroup({});
    this.options = {};
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schemaModel.schema)];
    this.model = this.schemaModel.model;

    this.fields = this.customFormatFields(this.fields);

  }

}
