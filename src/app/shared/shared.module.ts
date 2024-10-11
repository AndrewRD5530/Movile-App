import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SideMenuComponent]
})
export class SharedModule { }
