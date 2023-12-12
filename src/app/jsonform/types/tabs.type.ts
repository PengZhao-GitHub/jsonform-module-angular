import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group>
      <mat-tab
        *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
        [label]="tab.props?.label + '' + i">
        <formly-field [field]="tab"></formly-field>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {}

