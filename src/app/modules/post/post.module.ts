import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostConfirmComponent } from './components/post-confirm/post-confirm.component';
import { HeaderPostComponent } from './components/header-post/header-post.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    PostFormComponent,
    PostConfirmComponent,
    HeaderPostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    PostRoutingModule,
    IonicModule
  ]
})
export class PostModule { }
