import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import * as io from 'socket.io-client';
import { isEqual } from 'lodash';

import { ChatService } from '../../providers/chat-service';
import { SessionDataService } from '../../components/core/session/session-data.service';
import { Message } from '../../models/Message';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  // msgList: Message[] = [];
  messages: any;
  conversation: any;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string ;
  toUserName: string ;
  editorMsg: string = '';
  _isOpenEmojiPicker = false;
  socket: any = io('http://localhost:8000');
  idConversation: String;
  isTyping: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatService,
    public events: Events,
    public ref: ChangeDetectorRef,
    public sessionDataService: SessionDataService
  ) {

    this.idConversation = this.navParams.get('idConversation');
    this.userId = this.sessionDataService.getId();

    // Get mock user information
    // this.chatService.getUserInfo()
    // .then((res) => {
    // this.userId = res.id;
    // this.userName = res.name;
    // this.userAvatar = res.avatar;
    //   });

    this.socket.emit('enter conversation', this.idConversation);

    // Listen for refresh messages from socket server
    this.socket.on('refresh messages', (data) => {
      this.getMsg();
    });

    // Listen for refresh messages from socket server
    this.socket.on('is typing', (data) => {
      this.isTyping = data;
    });
  }

  ionViewDidLoad() {
    // this.switchEmojiPicker();
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');

  }

  ionViewDidEnter() {
    // get message list
    this.getMsg()
    .then(() => {
      this.scrollToBottom();
    });

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', (msg, time) => {
      this.pushNewMsg(msg);
    });
  }

  _focus() {
    this._isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this._isOpenEmojiPicker = !this._isOpenEmojiPicker;
    if (!this._isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    return this.chatService
    .getConversationById(this.idConversation)
    .then(response => {
      this.conversation = response;
      // this.toUserId = isEqual(this.conversation.participants[0], this.userId) ? this.conversation.participants[1] : this.userId
      this.toUserId = this.conversation.participants.indexOf(this.userId) === 0 ? this.conversation.participants[1] : this.conversation.participants[0];
      this.toUserName = this.getRecipientName(this.conversation.messages);
      this.messages = response.messages;
    })
    .catch(err => {
      // console.log(err);
    });
  }

  getRecipientName(messages) {
    if (isEqual(messages[0].user._id, this.sessionDataService.getId())) {
      return `${messages[0].toUser.lastName } ${messages[0].toUser.firstName}`;
    } else if (isEqual(messages[0].toUser._id, this.sessionDataService.getId())) {
      return `${messages[0].user.lastName } ${messages[0].user.firstName}`;
    }
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) {
      return;
    }
    let newMsg: any = {
      message: this.editorMsg
    };

    this.pushNewMsg(newMsg);
    this.chatService
    .sendMessage(this.toUserId, newMsg)
    .then(response => {
      this.socket.emit('new message', this.idConversation);
      this.editorMsg = '';
    })
    .catch(err => {
      // console.log(err);
    });

    if (!this._isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: Message) {
    // Verify user relationships
    /* if(msg.userId === this.userId &&  msg.toUserId === this.toUserId){
     this.msgList.push(msg);
     }else if (msg.toUserId === this.userId && msg.userId === this.toUserId){
     this.msgList.push(msg);
     }
     this.scrollToBottom(); */
  }

  getMsgIndexById(id: string) {
    // return this.msgList.findIndex( e => e.id === id)
  }

  typing() {
    const isTyping = (this.editorMsg !== '');
    const data = {
      conversation: this.idConversation,
      isTyping
    };
    this.socket.emit('is typing', data);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }
}
