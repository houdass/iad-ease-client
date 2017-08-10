import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { User } from '../models/User';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(
    public http: Http,
    public events: Events) {
  }

  login(credentials): Promise<User> {
    const url = '/auth/login';

    return this.http.post(url, credentials)
    .toPromise()
    .then(response => response.json())
    // response.json().array as ChatMessage[])
    .catch(err => Promise.reject(err || 'err'));
  }
}
