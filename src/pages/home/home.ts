import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ChatService } from '../../providers/chat.service';
import { UtilService } from '../../providers/util.service';
import { ChatPage } from '../chat/chat';
import { isEqual } from 'lodash';
import * as io from 'socket.io-client';

import { SessionDataService } from '../../core/session/session-data.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UtilService]
})
export class HomePage {

  toUser: Object;
  conversations: any;
  recipientId: any;
  socket: any = io('http://localhost:8000');

  constructor(public navCtrl: NavController,
              public chatService: ChatService,
              public utilService: UtilService,
              public sessionDataService: SessionDataService) {}

  ionViewWillLeave() {
    this.socket.emit('leave notify list contacts', this.sessionDataService.getId());
  }

  ionViewDidEnter() {
    this.utilService.logger('Houdass Youness');
    this.socket.emit('notify list contacts', this.sessionDataService.getId());
    // Listen for refresh messages from socket server
    this.socket.on('notify him now', () => {
      // get message list
      this.getConversations();
    });

    // get message list
    this.getConversations();
  }

  getRecipientName(messages) {
    if (isEqual(messages[0].user._id, this.sessionDataService.getId())) {
      this.recipientId = messages[0].toUser._id;
      return `${messages[0].toUser.lastName } ${messages[0].toUser.firstName}`;
    } else if (isEqual(messages[0].toUser._id, this.sessionDataService.getId())) {
      this.recipientId = messages[0].user._id;
      return `${messages[0].user.lastName } ${messages[0].user.firstName}`;
    }
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getConversations() {
    return this.chatService
    .getConversations()
    .then((response) => {
      this.conversations = response;
    })
    .catch((err) => {
      // console.log(err);
    });
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  goToConversation(conversationId: String, recipientId: String) {
    this.navCtrl.push(ChatPage, { conversationId, recipientId});
  }
}
