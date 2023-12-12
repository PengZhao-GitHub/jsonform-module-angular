import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { HttpClient } from '@angular/common/http';
import { tap, takeUntil } from 'rxjs/operators';


import { Subject } from 'rxjs';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();

  e: any;
  schemaModel: any;

  form: FormGroup = new FormGroup({});

  model: any;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[] = [];

  type: string = '';

  examples = [
    'simple',
    'nested',
    'arrays',
    'numbers',
    'references',
    'schema_dependencies',
    'null_field',
    'nullable',
    'allOf',
    'anyOf',
    'oneOf',
    'select_alternatives',
    'quote'
  ];

  constructor(private formlyJsonschema: FormlyJsonschema, private http: HttpClient, private fb: FormBuilder) {
    //this.loadExample(this.examples[0]);

  }

  async ngOnInit() {
    await this.loadExample(this.examples[0]);
  }

  async loadExample(type: string) {
    console.log(type)
    //type = "quote"
    this.http
      .get<any>(`assets/json-schema/${type}.json`)
      .pipe(
        tap(({ schema, model }) => {
          this.type = type;
          this.form = new FormGroup({});
          this.options = {};
          this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
          this.model = model;
          this.fields = this.formatQuoteFields(this.fields);


          console.log("schema:", schema)
          console.log("model:", model)
          console.log("fields:", this.fields)
          console.log("options:", this.options)

          //assign schema to a jsonform
          this.schemaModel = {
            schema : schema,
            model: model
          }
          console.log("this.schemaModel", this.schemaModel)
          //refresh app-jsonform
          //<app-jsonform [schemaModel]="schemaModel"> </app-jsonform>
          //when schemaModel changes, it should refresh the jsonform


        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  submit() {
    console.log("submit-model", this.model)
    console.log("submit-fields", this.fields)

    //alert(JSON.stringify(this.model));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  // toggleDisabled() {
  //   this.options.formState.disabled = !this.options.formState.disabled;
  // }

  formatQuoteFields(fields: FormlyFieldConfig[]) {
    console.log("formatQuoteFields", fields)

    fields[0].type = 'stepper';
    //fields[0].type = 'tabs';

    //find key fields with value as "risk"
    //let riskFields = fields[0].fieldGroup ? fields[0].fieldGroup.filter(f => f.key === 'risk') : [];

    // find the pointer to the risk field
    // let riskField = fields[0].fieldGroup ? fields[0].fieldGroup.find(f => f.key === 'risk') : null;
    // console.log("riskField", riskField)
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


  // onClick(e: any) {

  //   console.log("onClick", e.target)
  //   console.log("onClick", this.fields)

  //   this.fields[0].fieldGroup?.forEach(f => {
  //     if (f.key === 'risk') {
  //       console.log("riskField", f)

  //       // f.fieldGroup?.forEach(fg => {
  //       //   fg.type = 'tabs';

  //       // })




  //       //f.type = 'tabs';

  //       // //ng-star-inserted
  //       // // query element which has class name 'ng-star-inserted'
  //       const elements = document.querySelector('formly-array-type');

  //       elements?.childNodes.forEach((element: any) => {
  //         //change background color to red
  //         console.log("element", element)

  //         // get child elements which has class name "row"
  //         const childElements = element.querySelectorAll('.row');
  //         console.log("childElements", childElements)


  //         childElements.forEach((childElement: any) => {
  //           console.log("childElement", childElement)
  //           // get parent element of child element
  //           const parentElement = childElement.parentElement;
  //           console.log("parentElement", parentElement)

  //           // give random color to each child element
  //           childElement.style.backgroundColor = 'green';
  //           childElement.style.padding = '10px'; // Adjust margins as needed
  //           childElement.style.margin = '20px'; // Adjust margins as needed

  //           // //clone a child element
  //           const newChildElement = childElement.cloneNode(true);
  //           newChildElement.style.backgroundColor = 'yellow';


  //           parentElement.style.backgroundColor = 'red';
  //           // // add it to the parent
  //           parentElement.appendChild(newChildElement);

  //           // // delete the child element
  //           parentElement.removeChild(childElement);



  //         });


  //       });


  //     }
  //   })

  // }

  modelChange(e: any) {
    console.log("click -> model chanage", e)


  }

  modelChangeBackup(e: any) {
    console.log("click -> model chanage", e)

    this.fields[0].fieldGroup?.forEach(f => {
      if (f.key === 'risk') {
        console.log("riskField", f)

        const formlyArray = document.querySelector('formly-array-type');

        if (!formlyArray) return

        console.log("*****************formlyArray**********", formlyArray)


        formlyArray.childNodes.forEach((element: any) => {
          //change background color to red
          console.log("element", element)

          //change background color to red
          element.style.backgroundColor = 'gray';
          element.style.padding = '10px'; // Adjust margins as needed
          element.style.margin = '10px'; // Adjust margins as needed

          const childElements = element.querySelectorAll('.row');
          childElements.forEach((childElement: any) => {

            childElement.style.backgroundColor = 'yellow';
            childElement.style.padding = '10px'; // Adjust margins as needed
            childElement.style.margin = '20px'; // Adjust margins as needed

            //get legend element
            // const legend = childElement.querySelector('legend');
            // console.log("legend", legend)




            // check if button is already added
            const button = childElement.querySelector('.expand-button');
            console.log("button", button)
            if (button) return;

            //add a button
            const newButton = document.createElement('button');
            newButton.innerHTML = "Cllapse";
            //newButton.className = "expand-button";
            // add class expand-button to the new button
            newButton.classList.add("expand-button");

            // newButton.style.backgroundColor = 'green';

            //add event listener
            newButton.addEventListener('click', (e: any) => {
              console.log("click -> model chanage", e)

              //get parent element
              // const parentElement = e.target.parentElement;
              // console.log("parentElement", parentElement)
              // parentElement.parentElement.style.display = parentElement.parentElement.style.display =='none' ? 'block' : 'none';
              const container = e.target.parentElement.parentElement.querySelector('formly-field');
              container.style.display = container.style.display == 'none' ? 'block' : 'none';
              e.target.innerHTML = e.target.innerHTML == 'Cllapse' ? 'Expand' : 'Cllapse';

            })

            //get the delete button
            const deleteButton = childElement.querySelector('.btn-danger');
            console.log("deleteButton", deleteButton)
            
            // create a new div element
            const newDiv = document.createElement("div");
            //set div disaply to flex
            //newDiv.style. = "display: flex; flex-direction: row; justify-content: space-between; align-items: center;";
            newDiv.style.display = "flex";
            newDiv.style.flexDirection = "row";
            newDiv.style.justifyContent = "space-between";
            newDiv.style.alignItems = "center";

            //append the two buttons to the new div
            newDiv.appendChild(deleteButton);
            newDiv.appendChild(newButton);
            

            //append the new div to the child element
            childElement.appendChild(newDiv);

            // childElement.appendChild(deleteButton);
            // childElement.appendChild(newButton);


            //legend.appendChild(newButton);

          })

          //formate element to tabs
          //this.formatToTabs(element);

        })
      }
    })

  }

  formatToTabs(element: any) {
    console.log("formatToTabs", element)

    // create a <mat-tab-group> element
    const tabGroup = document.createElement('mat-tab-group');
    const childElements = element.querySelectorAll('.row');
    //convert each child element to a tab
    childElements.forEach((childElement: any) => {
      console.log("childElement", childElement)

      //clone a child element
      const newChildElement = childElement.cloneNode(true);

      // create a <mat-tab> element
      const tab = document.createElement('mat-tab');
      tab.setAttribute('label', "Peng");

      // move the child element into the <mat-tab> element
      tab.appendChild(newChildElement);

      // move the <mat-tab> element into the <mat-tab-group> element
      tabGroup.appendChild(tab);

      //remove the child element


    });

    //element.parentElement.parentElement.appendChild(tabGroup);
    console.log("tabGroup", tabGroup)
    console.log("element", element)

    // replace element with the <mat-tab-group> element




  }

}
