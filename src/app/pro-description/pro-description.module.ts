import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { ProDescriptionPageRoutingModule } from './pro-description-routing.module';
import { ProDescriptionPage } from './pro-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProDescriptionPageRoutingModule,
    HttpClientModule // Asegúrate de incluir HttpClientModule
  ],
  declarations: [ProDescriptionPage]
})
export class ProDescriptionPageModule {
  constructor() {
    console.log("ProDescriptionPageModule loaded");
  }
}
