import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  constructor(public http: Http) {
  }

  getConversationById(idConversation: String): Promise<any> {
    return this.http.get(`/chat/${idConversation}`)
    .toPromise()
    .then(response => response.json())
    .catch(err => Promise.reject(err || 'err'));
  }

  getConversations(): Promise<any> {
    return this.http.get('/chat')
    .toPromise()
    .then(response => response.json())
    .catch(err => Promise.reject(err || 'err'));
  }

  sendMessage(recipientId: String, message: Object): Promise<any> {
    return this.http.post(`/chat/new/${recipientId}`, message)
    .toPromise()
    .then(response => response.json())
    .catch(err => Promise.reject(err || 'err'));
  }
}
