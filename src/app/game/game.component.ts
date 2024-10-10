import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CardComponent } from "./card/card.component";

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DialogOverviewExampleDialog, MatDialogModule, CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
name: string = '';
turnCardAnimation: boolean = false;
game: Game;
imageSrc: string | undefined = "assets/img/cards/purple_back.png";
currentCard:{name: string, src: string } | undefined = { name: 'test', src: 'test' };


constructor(public dialog: MatDialog) {
  this.game = new Game();
}


newGame() {
  this.game = new Game();
}


turnCard() {
  if (!this.turnCardAnimation) {
    this.currentCard = this.game.stack.length === 0 ? { name: 'test', src: 'test' } : this.game.stack.pop();
    this.turnCardAnimation = true;
    this.imageSrc = this.currentCard?.src;
    setTimeout (() => {
      this.turnCardAnimation = false;
      this.game.discard.push(this.currentCard ?? { name: 'test', src: 'test' });
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
  }, 1450)
};
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    data: {name: this.name},
  });

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name) {
      this.game.players.push(name);  
    }
  });
 
}
}