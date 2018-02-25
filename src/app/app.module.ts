import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CreatePage } from '../pages/create/create';
import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModifierPage } from '../pages/modifier/modifier';
import { PanierPage } from '../pages/panier/panier';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PizzaServices } from '../providers/pizza-service/pizza-service';
import { PanierServices } from '../providers/panier-service/panier-service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    CreatePage,
    AdminPage,
    HomePage,
    TabsPage,
    ModifierPage,
    PanierPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreatePage,
    AdminPage,
    HomePage,
    TabsPage,
    ModifierPage,
    PanierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaServices,
    PanierServices
  ]
})
export class AppModule {}
