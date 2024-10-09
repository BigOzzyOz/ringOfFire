import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DialogOverviewExampleDialog, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
name: string = '';
turnCardAnimation: boolean = false;
game: Game;
imageSrc: string | undefined = "assets/img/cards/purple_back.png";
currentCard?:{name: string, src: string } = { name: 'test', src: 'test' };


constructor(public dialog: MatDialog) {
  this.game = new Game();
  console.log(this.game);
}


newGame() {
  this.game = new Game();
}


turnCard() {
  if (!this.turnCardAnimation) {
    this.currentCard = this.game.stack.pop();
    this.turnCardAnimation = true;
    this.imageSrc = this.currentCard?.src;
    setTimeout (() => {
      this.turnCardAnimation = false;
      this.game.discard.push(this.currentCard ?? { name: 'test', src: 'test' });
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