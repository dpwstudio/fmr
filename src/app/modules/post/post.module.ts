import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    PostFormComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    IonicModule
  ]
})
export class PostModule { }
