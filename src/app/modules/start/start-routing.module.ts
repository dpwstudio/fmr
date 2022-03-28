import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartArtComponent } from './pages/start-art/start-art.component';
import { StartModeComponent } from './pages/start-mode/start-mode.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    data: {
      title: 'Start',
      animationState: 'One'
    }
  },
  {
    path: 'start-mode',
    component: StartModeComponent,
    data: {
      title: 'Mode',
      animationState: 'Two'
    }
  },
  {
    path: 'start-art',
    component: StartArtComponent,
    data: {
      title: 'Art',
      animationState: 'Three'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
