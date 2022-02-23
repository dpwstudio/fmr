import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports: [
    LoaderComponent,
  ]
})
export class SharedModule { }
