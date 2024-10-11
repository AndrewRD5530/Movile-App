import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProDescriptionPage } from './pro-description.page';

const routes: Routes = [
  {
    path: '',
    component: ProDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProDescriptionPageRoutingModule {
  constructor() {
    console.log("ProDescriptionPageRoutingModule loaded");
  }
}
