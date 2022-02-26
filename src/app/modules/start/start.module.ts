import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './pages/start/start.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../_shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CarouselModule,
    StartRoutingModule
  ]
})
export class StartModule { }
