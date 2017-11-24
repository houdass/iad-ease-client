import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from '../constants/app.config';
import { SessionDataService } from '../core/session/session-data.service';

@Injectable()
export class HttpInterceptor extends Http {

  sessionDataService: any;
  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              sessionDataService: SessionDataService) {
    super(backend, defaultOptions);
    this.sessionDataService = sessionDataService;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return super.delete(url, this.getRequestOptionArgs(options));
  }

  private updateUrl(req: string) {
    return AppConfig.API_ENDPOINT + req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions();
    }
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', this.sessionDataService.getToken());
    return options;
  }
}