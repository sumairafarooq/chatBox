import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ChatBot';
  numbers: number[];
  constructor()
  {
    this.numbers = Array.from({ length: 10 }, (_, i) => i + 1); 
  }
  //This is the reason; app bot is used here; thats why the css of bot class which is in bot component is applied overall all page.
  }