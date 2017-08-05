import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

import { User } from '../models/User';
import { Message } from '../models/Message';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  constructor(public http: Http, public events: Events) {
  }

  mockNewMsg(msg) {
      setTimeout(() => {
          this.events.publish('chat:received', {
              id: Date.now().toString(),
              userId: '210000198410281948',
              userName: 'Hancock',
              userAvatar: './assets/to-user.jpg',
              toUserId: '140000198202211138',
              time: Date.now(),
              message: msg.message,
              status: 'success'
          }, Date.now());
      }, Math.random() * 1800);
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

  sendMsg(msg: Message) {
      return new Promise( (resolve, reject) => {
          setTimeout( () => {
              resolve(msg);
          }, Math.random() * 1000);
      }).then(() => {
          this.mockNewMsg(msg);
      });
  }

  getUserInfo(): void {
     /* let user: User = {
          id:'140000198202211138',
          name:'Luff',
          avatar:'./assets/user.jpg'
      };
      return new Promise((resolve, reject) => {
          resolve(user);
      });*/
  }

}
