import { Injectable } from '@angular/core';
import { SessionDataService } from './session-data.service';
import { SessionConstants } from '../../constants/session.constants';

@Injectable()
export class SessionService {

  private data: any;
  private token: any;

  constructor(public sessionDataService: SessionDataService) {}

  // create session
  create(data: any): boolean {
    this.clear();
    if (data && data.user) {
      // save data of session in localStorage
      localStorage.setItem(SessionConstants.SESSION, JSON.stringify(data.user));
      this.data = data;
      // create instance of SessionData if given data are valid
      this.sessionDataService.create(data);
      if (data.token) {
        localStorage.setItem(SessionConstants.TOKEN, JSON.stringify(data.token));
        return true;
      }
    }
    return false;
  }

  // clear timeout and removed session data
  clear() {
    this.sessionDataService.clear();
  }

  load() {
    if (localStorage) {
      if (localStorage.getItem(SessionConstants.SESSION)) {
        this.create(JSON.parse(localStorage.getItem(SessionConstants.SESSION)));
      }
    }
  }

  isAuthenticated() {
    return this.data && this.token;
  }

}


