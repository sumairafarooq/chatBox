
import { Component,ViewChild,ElementRef,AfterViewChecked } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.scss'
})
export class BotComponent implements AfterViewChecked {
  @ViewChild('scrollFrame') scrollFrame!: ElementRef;
  title = 'Simple and EasyChatbot';
  messageArray: any = [];
  messageArrayOptions: any =[];
  synth:any;
  voices:any;
  showChatDiv: boolean = false;
  autoScroll: boolean = false;

  constructor(private socketService:SocketService, private router: Router) {

    this.synth = window.speechSynthesis;
    this.voices = this.synth.getVoices();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.scrollFrame.nativeElement.scrollTop = this.scrollFrame.nativeElement.scrollHeight;
    } catch(err) { }
}



  message: any= '';

  ngOnInit(){
    this.socketService.receiveReply().subscribe(data=> {
      this.messageArray.push({name:'bot', message: data.outputMessage});
      this.speak(data.outputMessage);
  
    });
    this.messageArrayOptions=[{name:'bot', message: "Address"},{name:'bot', message: "Search"}]
  }
  autoOptions(mess: any) {
    switch (mess) {
      case "Address": {
        this.message = mess
        this.messageArray.push({ name: 'you', message: this.message });
        this.messageArrayOptions = []
        this.messageArrayOptions.push(
          { name: 'bot', message: "New" },
          { name: 'bot', message: "More Options" },
          { name: 'bot', message: "click me"}
        );
        this.message = '';
        break;
      }
      case "More Options": {
        this.message = mess
        this.messageArray.push({ name: 'you', message: this.message });
        this.message = '';
        this.defaultmessage()
        break;
      }
      case "click me": {
        window.location.href = 'https://www.youtube.com/watch?v=vZ_NpLWuL00&list=RDvZ_NpLWuL00&start_radio=1';
        break;
      }
      default: {
        this.message = mess
        this.messageArrayOptions = []
        this.sendMessage()
        this.messageArrayOptions.push(
          { name: 'bot', message: "More Options" }
        );
        break;
      }
    }
    this.autoScroll = true;
    setTimeout(() => this.scrollToBottom(), 100); // Ensure DOM has updated
  }
  defaultmessage() {
    this.messageArrayOptions=[{name:'bot', message: "Address"},{name:'bot', message: "Search"}]
  }
  sendMessage(){
    const data = { message:this.message };
    this.scrollToBottom();
    this.speak(this.message);
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
showrobotdiv(){

  this.showChatDiv = !this.showChatDiv
  }

}