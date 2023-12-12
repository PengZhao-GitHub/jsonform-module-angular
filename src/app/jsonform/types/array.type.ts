import { ChangeDetectorRef, Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  styleUrls : [ './jsonform-custom.scss' ],
  template: `
    <div>
      <!-- <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p> -->
      <div>
        <button mat-raised-button color="primary" class="btn btn-primary" type="button" (click)="add()">Add new {{ props.label }}</button>
      </div>

      <div class="alert alert-danger" role="alert" *ngIf="showError && formControl.errors">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <mat-tab-group>
          <div *ngFor="let field of field.fieldGroup; let i = index;" >
              <mat-tab >
              
                  <ng-template mat-tab-label>
                      <div>{{ field.props?.label + '' + i }}</div>
                      <ng-container *ngIf="field.props?.['removable'] !== false">
                          <button mat-icon-button (click)="remove(i)">
                              <mat-icon class="smaller-icon">clear</mat-icon>
                          </button>
                      </ng-container>
                  </ng-template>

                  <formly-field [field]="field"></formly-field>

                </mat-tab>
          </div>
      </mat-tab-group>
  `,
})
export class ArrayTypeComponent extends FieldArrayType {}


