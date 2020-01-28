import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild("chatMessage",{static:true}) chatMessage:ElementRef
  messages = ["hi","kya hal chal?","kaise ho ?","nice","game","try something"];
  constructor(private chatService:ChatService) { }

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      this.messages.push(msg.text);
    })
  }
  sendMessage(message: string){
    this.chatService.sendMsg(message);
    this.chatMessage.nativeElement.value =""
  }

}
