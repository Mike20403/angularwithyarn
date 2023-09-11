import { Component } from '@angular/core';

import { environment } from '@app/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularyarn';

  environment = environment;
}
