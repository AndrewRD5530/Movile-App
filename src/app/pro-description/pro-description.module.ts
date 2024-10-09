import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProDescriptionPageRoutingModule } from './pro-description-routing.module';

import { ProDescriptionPage } from './pro-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProDescriptionPageRoutingModule
  ],
  declarations: [ProDescriptionPage]
})
export class ProDescriptionPageModule {}
