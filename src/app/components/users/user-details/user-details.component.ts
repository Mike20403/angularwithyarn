import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  userId!: String | null;

  constructor(private route: ActivatedRoute) {

    this.userId = this.route.snapshot.paramMap.get('id');

  }
}
