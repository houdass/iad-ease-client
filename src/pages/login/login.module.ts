import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { SessionService } from '../../components/core/session/session.service';
import { SessionDataService } from '../../components/core/session/session-data.service';

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage)],
  providers: [
    LoginService,
    SessionService,
    SessionDataService
  ]
})
export class LoginPageModule {}
