import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, XHRBackend, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { App } from './app.component';
// import { AboutPageModule } from '../pages/about/about.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { MapPageModule } from '../pages/map/map.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';

import { HttpInterceptor } from '../config/HttpInterceptor';
import { SessionDataService } from '../components/core/session/session-data.service';

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
    HomePageModule,
    LoginPageModule,
    TabsPageModule,
    ChatPageModule,
    MapPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmojiProvider,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, SessionDataService]
    }
  ]
})
export class AppModule {}
