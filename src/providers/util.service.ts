import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilService {

  constructor(public http: Http) {}

  logger(msg) {
    console.log('FROM LOGGER: ', msg);
  }
}
