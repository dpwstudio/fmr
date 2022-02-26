import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostConfirmComponent } from './components/post-confirm/post-confirm.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  {
    path: 'post',
    component: PostFormComponent
  },
  {
    path: 'post-confirm',
    component: PostConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
