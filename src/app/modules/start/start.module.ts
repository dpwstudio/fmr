import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './pages/start/start.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    StartRoutingModule
  ]
})
export class StartModule { }
