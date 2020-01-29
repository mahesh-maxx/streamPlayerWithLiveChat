import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Paho } from "../../ng2-mqtt/mqttws31";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit ,OnDestroy{
  @ViewChild("chatMessage",{static:true}) chatMessage:ElementRef
  messages = [];
  private client : Paho.MQTT.Client;
  private message : Paho.MQTT.Message;
  constructor() {
    this.client  = new Paho.MQTT.Client("mqtt.eclipse.org", Number(443), "JioChatMqttclient1")
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.',responseObject);
    };

    this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      this.messages.push(message.payloadString);
      console.log('Message arrived.', message);
    };

    this.client.connect({ onSuccess: this.onConnect.bind(this) });
    }

  ngOnInit() {
  }
  onConnect() { 
    console.log("onConnect");
    this.client.subscribe("/JioChatMqtt/topic1",{});
  }

  sendMessage(message:string){
    if(message!=="") {
    this.message = new Paho.MQTT.Message(message);
    this.message.destinationName = "/JioChatMqtt/topic1";
    this.client.send(this.message);
    this.chatMessage.nativeElement.value =""
    }
    else {
        alert("Blank message cannot be sent.")
    }  
  }
  ngOnDestroy() {
    this.client.disconnect();
  }
 
}
