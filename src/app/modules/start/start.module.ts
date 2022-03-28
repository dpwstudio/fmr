import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './pages/start/start.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../_shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StartModeComponent } from './pages/start-mode/start-mode.component';
import { StartArtComponent } from './pages/start-art/start-art.component';


@NgModule({
  declarations: [
    StartComponent,
    StartModeComponent,
    StartArtComponent
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
