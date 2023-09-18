import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [SharedModule, AdminDashboardRoutingModule,MatIconModule,MatButtonModule,MatDividerModule,MatBadgeModule,MatCardModule],
  exports: []
})
export class AdminDashboardModule {
//test1
}
