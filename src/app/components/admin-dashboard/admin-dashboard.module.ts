import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [SharedModule, AdminDashboardRoutingModule],
  exports: []
})
export class AdminDashboardModule {

}
