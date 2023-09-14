import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId!: String | null;

  constructor(private route: ActivatedRoute) {

    this.userId = this.route.snapshot.paramMap.get('id');

  }
}
