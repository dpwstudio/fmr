import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './modules/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { StartModule } from './modules/start/start.module';
import { PostModule } from './modules/post/post.module';
import { ContactModule } from './modules/contact/contact.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LayoutModule,
    ShopModule,
    UserModule,
    StartModule,
    PostModule,
    ContactModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
