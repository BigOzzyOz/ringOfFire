export class Game {
  public players: { name: string, image: string }[] = [];
  public stack: { name: string, src: string }[] = [];
  public discard: { name: string, src: string }[] = [];
  public currentPlayer: number = 0;


  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push({
        name: 'spade_' + i,
        src: 'assets/img/cards/spade_' + i + '.png'
      });
      this.stack.push({
        name: 'hearts_' + i,
        src: 'assets/img/cards/hearts_' + i + '.png'
      });
      this.stack.push({
        name: 'diamonds_' + i,
        src: 'assets/img/cards/diamonds_' + i + '.png'
      });
      this.stack.push({
        name: 'clubs_' + i,
        src: 'assets/img/cards/clubs_' + i + '.png'
      });
    }
    this.shuffleCards(this.stack);
  }


  shuffleCards(array: { name: string, src: string }[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
}