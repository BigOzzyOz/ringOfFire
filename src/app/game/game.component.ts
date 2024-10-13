import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { GameService } from '../firebase-service/game.service';
import { ActivatedRoute, Router } from '@angular/router';


export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, DialogOverviewExampleDialog, MatDialogModule, CardComponent,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})


export class GameComponent {
  gameId: string = '';
  name: string = '';
  turnCardAnimation: boolean = false;
  game: Game;
  imageSrc: string | undefined = 'assets/img/cards/purple_back.png';
  currentCard: { name: string; src: string; } | undefined = { name: '', src: '', };


  constructor(public dialog: MatDialog, private gameService: GameService, private route: ActivatedRoute, private router: Router) {
    this.game = new Game();
    this.route.params.subscribe((params) => this.gameId = params?.['gameId'] ?? ':gameId');
    this.initGame();
  }


  async ngDoCheck(): Promise<void> {
    if (this.gameService.dataUpdate) {
      await this.getGame();
      this.gameService.dataUpdate = false;
    }
  }

  async initGame() {
    if (this.gameId != ':gameId') await this.getGame();
    else {
      const docRef = await this.gameService.addGame(this.createGame(this.game));
      if (docRef) this.gameId = docRef.id;
      this.router.navigate(['/game', this.gameId]);
    };
    this.gameService.gameId = this.gameId;
  }

  turnAndNextPlayer() {
    this.changePlayer();
    this.turnCard();
  }


  async turnCard() {
    if (!this.turnCardAnimation) {
      this.currentCard = this.game.stack.length === 0 ? { name: '', src: '', } : this.game.stack.pop();
      this.turnCardAnimation = true;
      this.imageSrc = this.currentCard?.src;
      await this.gameService.updateGame(this.gameId, this.createGame(this.game));
      setTimeout(async () => {
        this.game.discard.push(this.currentCard ?? { name: '', src: '', });
        this.turnCardAnimation = false;
        await this.gameService.updateGame(this.gameId, this.createGame(this.game));
      }, 1450);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, },
    });
    dialogRef.afterClosed().subscribe(async (name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.currentPlayer = this.game.players.indexOf(name);
        await this.gameService.updateGame(this.gameId, this.createGame(this.game));
      };
    });
  }


  async getGame() {
    let oldGame: any = await this.gameService.getGame(this.gameId);
    if (this.isNextTurn(oldGame)) {
      this.changePlayer();
      this.turnCard();
    } else if (this.isOldGame(oldGame)) {
      this.game.players = oldGame.players;
      this.game.currentPlayer = oldGame.currentPlayer;
      this.game.discard = oldGame.discard;
      this.game.stack = oldGame.stack;
    }
  }


  createGame(game: Game) {
    return {
      players: this.game.players,
      currentPlayer: this.game.currentPlayer,
      discard: this.game.discard,
      stack: this.game.stack,
    };
  }


  changePlayer() {
    if (!this.turnCardAnimation) {
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    }
  }


  isOldGame(oldGame: Game) {
    return oldGame.stack.length === this.game.stack.length || oldGame.stack.length < this.game.stack.length - 1;
  }


  isNextTurn(oldGame: Game) {
    return oldGame.stack.length === this.game.stack.length - 1;
  }
}