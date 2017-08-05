import { Component } from '@angular/core';

import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { NavController, IonicPage } from 'ionic-angular';

import { LoginService } from "../../providers/login-service";
import { SessionService } from "../../components/core/session/session.service";

import { TabsPage } from "../tabs/tabs";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  animations: [
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    // For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1500ms ease-in-out')
      ])
    ]),

    // For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    // For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  user: any = {};

  constructor(public navCtrl: NavController,
              public loginService: LoginService,
              public sessionService: SessionService) {
  }

  onSubmit() {
    if (this.user.email === '' || this.user.password === '') {
      this.showError();
    } else {
      this.loginService.login(this.user)
          .then((response) => {
            this.loginSucceed(response);
          }, (error) => {
            this.showError(error);
          });
    }
  }

  loginSucceed(response: any) {
    if (this.sessionService.create(response)) {
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.showError();
    }
  }

  showError(error?: any) {
    // console.log('Oops!', 'Login ou mot de passe incorrect', error);
  }

}