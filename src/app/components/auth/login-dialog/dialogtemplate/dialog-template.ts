import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'matdialog-template',
  template: `<title>Angular Starter</title>

  `,
  styleUrls: ['/dialogtemplate.css']
})

export class DialogTemplate {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
