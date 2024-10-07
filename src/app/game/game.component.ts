import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
turnCardAnimation = false;
game: Game;
imageSrc: string | undefined = "assets/img/cards/gray_back.png";
currentCard?:{name: string, src: string } = { name: 'test', src: 'test' };


constructor() {
  this.game = new Game();
  console.log(this.game);
}


newGame() {
  this.game = new Game();
}


turnCard() {
this.turnCardAnimation = true;
this.currentCard = this.game.stack.pop();
 
this.imageSrc = this.currentCard?.src;
this.game.discard.push(this.currentCard ?? { name: 'test', src: 'test' });
}
}
