import { Component, Input, OnChanges } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrl: 'card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
})
export class CardComponent implements OnChanges {
  cardAction: any = [
    {
      "title": "Ace",
      "description": "The ace stands for the waterfall. All players start to drink. In a clockwise direction, drinking may only be stopped when the person sitting next to you on the right has finished his waterfall. The player who draws the ace is allowed to stop drinking first (when he wants)."
    },
    {
      "title": "2 is for you",
      "description": "You can choose a person to take a sip of their drink."
    },
    {
      "title": "3 is me",
      "description": "You have to drink a sip."
    },
    {
      "title": "4 is floor",
      "description": "Touch the floor with your hand. The teammate who was last on the ground has to take a sip."
    },
    {
      "title": "5 is thumbmaster",
      "description": "Touch the tabletop with your thumb. The last player to touch the table has to take a sip."
    },
    {
      "title": "6 is for chicks",
      "description": "The women of creation have to take a sip."
    },
    {
      "title": "7 is heaven",
      "description": "Point your index finger towards the sky. Whoever points to the sky last has to have a drink."
    },
    {
      "title": "8 is mate",
      "description": "Designate a teammate who from now on has to have a drink with you every time you are asked to."
    },
    {
      "title": "9 is rhyme",
      "description": "Pick a word. In a clockwise direction, the other players have to figure it out. Anyone who repeats a word or cannot find a new rhyme has to take a sip."
    },
    {
      "title": "10 is men",
      "description": "The men can toast and have a drink."
    },
    {
      "title": "Jack",
      "description": "The person who draws a jack is allowed to come up with a new rule that applies until the end of the game. The rule cannot override others."
    },
    {
      "title": "Queen",
      "description": "The player may call out 'Never have I ever ...' for one round. The losers drink."
    },
    {
      "title": "King",
      "description": "If a king is drawn, the player may pour a drink of his choice into the Kingscup. If the fourth king is drawn, the player must immediately empty the kingscup in the middle of the game."
    },
  ];

  title: string = '';
  description: string = '';
  @Input() card: { name: string, src: string } = {
    name: '',
    src: ''
  };
  cardNumber: number = 0;

constructor() {

}

ngOnInit(): void {

}

ngOnChanges(): void {
  this.updateCard();
}


updateCard() {
  const cardNumber = +this.card.name.split('_')[1] - 1;
  this.title = this.cardAction[cardNumber].title;
  this.description = this.cardAction[cardNumber].description;
}

}
