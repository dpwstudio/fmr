import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { IonicModule } from '@ionic/angular';
import { ImageComponent } from './components/image/image.component';
import { CardProductComponent } from './components/card-product/card-product.component';


@NgModule({
  declarations: [
    LoaderComponent,
    ImageComponent,
    CardProductComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports: [
    LoaderComponent,
    ImageComponent,
    CardProductComponent
  ]
})
export class SharedModule { }
