import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobHistoryPage } from './job-history';

@NgModule({
  declarations: [
    JobHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(JobHistoryPage)
  ],
  exports: [
    JobHistoryPage
  ]
})
export class JobHistoryPageModule {}