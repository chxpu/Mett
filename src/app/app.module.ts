import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {PracticePage} from "../pages/practice/practice";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BackButtonService} from '../providers/back-button/backButton.service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {IonicStorageModule} from "@ionic/storage";
import { CognitiveServiceProvider } from '../providers/cognitive-service/cognitive-service';
import {UserServiceProvider} from "../providers/user-service/user.service";
import {Camera} from "@ionic-native/camera";
import {IntroductionPage} from "../pages/introduction/introduction";


@NgModule({
  declarations: [
    MyApp,
    PracticePage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    IntroductionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PracticePage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    IntroductionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    UserServiceProvider,
    Storage,
    BackButtonService,
    ScreenOrientation,
    CognitiveServiceProvider,
    Camera
  ]
})
export class AppModule {}
