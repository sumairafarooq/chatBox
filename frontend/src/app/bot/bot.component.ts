
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.scss'
})
export class BotComponent implements OnInit {
  title = 'Simple and EasyChatbot';
  messageArray: any = [];
  synth:any;
  voices:any;
  showChatDiv: boolean = false;
  constructor(private socketService:SocketService) {
    this.synth = window.speechSynthesis;
    this.voices = this.synth.getVoices();
  }
  message: any= '';

  ngOnInit(){
    this.socketService.receiveReply().subscribe(data=> {
      this.messageArray.push({name:'bot', message: data.outputMessage});
      this.speak(data.outputMessage);
    });

  }
  sendMessage(){
    const data = { message:this.message };
    this.socketService.sendMessage(data);
    this.messageArray.push({name:'you', message:this.message});
    this.message = '';
  }

 speak(string : any) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  this.synth.speak(u);
}

}