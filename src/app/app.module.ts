import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, XHRBackend, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { App } from './app.component';

// Pages
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AboutPageModule } from '../pages/about/about.module';
import { MapPageModule } from '../pages/map/map.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';

import { HttpInterceptor } from '../config/HttpInterceptor';
import { SessionDataService } from '../core/session/session-data.service';

export function httpFactory(xhrBackend: XHRBackend,
                            requestOptions: RequestOptions,
                            sessionDataService: SessionDataService): Http {
  return new HttpInterceptor(xhrBackend, requestOptions, sessionDataService);
}

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(App, {
      tabsHideOnSubPages: true,
      tabsLayout: 'icon-left'
    }),
    LoginPageModule,
    HomePageModule,
    ChatPageModule,
    TabsPageModule,
    AboutPageModule,
    MapPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmojiProvider,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, SessionDataService]
    }
  ]
})
export class AppModule {}
