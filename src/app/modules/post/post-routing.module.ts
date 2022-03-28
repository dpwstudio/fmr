import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_shared/guard/auth/auth.guard';
import { PostConfirmComponent } from './components/post-confirm/post-confirm.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  {
    path: 'post',
    component: PostFormComponent,
    canActivate: [AuthGuard],
    data: { animationState: 'One' }
  },
  {
    path: 'post-confirm/:id',
    component: PostConfirmComponent,
    data: { animationState: 'Two' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
