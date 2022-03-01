import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      animationState: 'Three'
    }
  },
  {
    path: 'about',
    component: AboutUsComponent,
    data: {
      animationState: 'Three'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      animationState: 'Three'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfosRoutingModule { }
