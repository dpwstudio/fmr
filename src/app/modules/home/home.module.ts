import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { IonicModule } from '@ionic/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../_shared/shared.module';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    IonicModule,
    SharedModule,
    LayoutModule,
    CarouselModule,
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
