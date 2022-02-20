import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostRoutingModule,
    IonicModule
  ]
})
export class PostModule { }
