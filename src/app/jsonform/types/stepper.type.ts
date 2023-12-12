import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-stepper',
  styles: [
    `
      .form-buttons{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }

    `,
  ],
  template: `
    <mat-horizontal-stepper>
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last" >
        
            <ng-template matStepLabel>{{ step.props?.label }}</ng-template>
            
            <formly-field [field]="step"></formly-field>

            <div class="form-buttons">
              <button matStepperPrevious *ngIf="index !== 0" mat-raised-button  type="button">Back</button>

              <button matStepperNext *ngIf="!last" mat-raised-button  type="button" [disabled]="!isValid(step)">
                Next
              </button>

              <button *ngIf="last" mat-raised-button color="primary" [disabled]="!form.valid" type="submit" click="confirm($event)">Confirm</button>
            </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
})
export class FormlyFieldStepper extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl ? field.formControl.valid : false;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }

  confirm(e: any) {
    e.preventDefault();
    alert('You clicked confirm!');
  }
}
