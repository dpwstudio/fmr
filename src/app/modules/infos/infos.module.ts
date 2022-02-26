import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfosRoutingModule } from './infos-routing.module';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { IonicModule } from '@ionic/angular';
import { ContactComponent } from './pages/contact/contact.component';


@NgModule({
  declarations: [
    FaqComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    InfosRoutingModule,
    IonicModule
  ]
})
export class InfosModule { }
