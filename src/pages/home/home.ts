import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ChatService } from "../../providers/chat-service";
import { ChatPage } from "../chat/chat";
import { isEqual } from "lodash";

import { SessionDataService } from "../../components/core/session/session-data.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toUser: Object;
  conversations: any;

  constructor(public navCtrl: NavController,
              public chatService: ChatService,
              public SessionDataService: SessionDataService) {
    this.toUser = {
      toUserId: '210000198410281948',
      toUserName: 'Hancock'
    };
  }

  ionViewDidEnter() {
    // get message list
    this.getConversations()
        .then(() => {
        });
  }

  getRecipientName(messages) {
      if (isEqual(messages[0].user._id, this.SessionDataService.getId())) {
          return `${messages[0].toUser.lastName } ${messages[0].toUser.firstName}`;
      } else if (isEqual(messages[0].toUser._id, this.SessionDataService.getId())) {
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
        .then(response => {
          this.conversations = response;
        })
        .catch(err => {
          // console.log(err);
        });
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  goToConversation(idConversation: String) {
   this.navCtrl.push(ChatPage, { idConversation });
  }
}
