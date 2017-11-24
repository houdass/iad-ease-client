import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavParams, Events, Content, TextInput } from 'ionic-angular';
import * as io from 'socket.io-client';
import { isEqual } from 'lodash';

import { ChatService } from '../../providers/chat.service';
import { SessionDataService } from '../../core/session/session-data.service';

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
  toUserId: string ;
  toUserName: string ;
  editorMsg: string = '';
  isOpenEmojiPicker = false;
  socket: any = io('http://localhost:8000');
  conversationId: String;
  recipientId: String;
  isTyping: boolean;

  constructor(
    public navParams: NavParams,
    public chatService: ChatService,
    public events: Events,
    public ref: ChangeDetectorRef,
    public sessionDataService: SessionDataService) {}

  ionViewWillLeave() {
    this.socket.emit('leave conversation', this.conversationId);
    this.socket.emit('leave notify list contacts', this.recipientId);
  }

  ionViewDidEnter() {
    this.conversationId = this.navParams.get('conversationId');
    this.recipientId = this.navParams.get('recipientId');
    this.userId = this.sessionDataService.getId();

    this.socket.emit('enter conversation', this.conversationId);
    this.socket.emit('notify list contacts', this.recipientId);

    this.getMsg();
    this.scrollToBottom();

    // Listen for refresh messages from socket server
    this.socket.on('refresh messages', (data) => {
      this.getMsg();
      this.scrollToBottom();
    });

    // Listen for refresh messages from socket server
    this.socket.on('is typing', (data) => {
      this.isTyping = data;
    });
  }

  focus() {
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
    if (!this.isOpenEmojiPicker) {
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
    .getConversationById(this.conversationId)
    .then((response) => {
      this.conversation = response;
      this.toUserId = this.conversation.participants.indexOf(this.userId) === 0 ?
        this.conversation.participants[1] : this.conversation.participants[0];
      this.toUserName = this.getRecipientName(this.conversation.messages);
      this.messages = response.messages;
    })
    .catch((err) => {
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
    const newMsg: any = {
      message: this.editorMsg
    };
    this.chatService
    .sendMessage(this.toUserId, newMsg)
    .then((response) => {
      this.socket.emit('new message', this.conversationId);
      this.socket.emit('notify him', this.recipientId);

      this.editorMsg = '';
      this.typing();
    })
    .catch((err) => {
      // console.log(err);
    });

    if (!this.isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
  }

  typing() {
    const isTyping = (this.editorMsg !== '');
    const data = {
      isTyping,
      conversation: this.conversationId
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
