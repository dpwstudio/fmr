import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { FaqComponent } from './pages/faq/faq.component';
import { IonicModule } from '@ionic/angular';
import { ContactComponent } from './pages/contact/contact.component';
import { SharedModule } from '../_shared/shared.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    FaqComponent,
    ContactComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    CarouselModule,
    InfosRoutingModule,
    IonicModule
  ]
})
export class InfosModule { }
