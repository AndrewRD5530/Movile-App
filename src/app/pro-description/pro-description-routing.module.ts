import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProDescriptionPage } from './pro-description.page';

const routes: Routes = [
  {
    path: '',
    component: ProDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProDescriptionPageRoutingModule {}
