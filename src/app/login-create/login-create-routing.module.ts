import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCreatePage } from './login-create.page';

const routes: Routes = [
  {
    path: '',
    component: LoginCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCreatePageRoutingModule {}
