import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { IonicModule } from '@ionic/angular';
import { ImageComponent } from './components/image/image.component';


@NgModule({
  declarations: [
    LoaderComponent,
    ImageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports: [
    LoaderComponent,
    ImageComponent
  ]
})
export class SharedModule { }
