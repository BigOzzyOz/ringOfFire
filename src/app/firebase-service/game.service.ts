import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc, getDoc, Unsubscribe } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})


export class GameService implements OnDestroy {
  unsubGame;
  unsubCurrentGame!: Unsubscribe;
  gameId: string = '';
  dataUpdate: boolean = false;
  gameUpdated: boolean = false;
  firestore: Firestore = inject(Firestore);


  constructor() {
    this.unsubGame = this.subGame();
  }


  subCurrentGame() {
    return onSnapshot(doc(this.getColRef(), this.gameId), (doc) => {
      if (doc) this.dataUpdate = true;
    });
  }


  subGame() {
    return onSnapshot(this.getColRef(), (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id == this.gameId) this.dataUpdate = true;
      });
    });
  }


  async addGame(game: any) {
    let docRef = await addDoc(this.getColRef(), game)
      .catch((error) => console.error('Error adding document: ', error))
    if (docRef) return docRef;
    else return;
  }


  async getGame(gameId: string) {
    let docRef = await getDoc(doc(this.getColRef(), gameId));
    if (docRef) return docRef.data();
    else return;
  }


  async updateGame(gameId: string, game: any) {
    await updateDoc(doc(this.getColRef(), gameId), game)
      .catch((error) => console.error('Error updating document: ', error));
    if (this.unsubGame) this.unsubGame();
    if (!this.unsubCurrentGame) this.unsubCurrentGame = this.subCurrentGame();
  }


  async deleteGame(game: any) {
    await deleteDoc(doc(this.getColRef(), game.id));
    if (this.unsubGame) this.unsubGame();
    if (this.unsubCurrentGame) this.unsubCurrentGame();
  }


  getColRef() {
    return collection(this.firestore, 'games');
  }


  ngOnDestroy(): void {
    if (this.unsubGame) this.unsubGame();
    else if (this.unsubCurrentGame) this.unsubCurrentGame();
  }
}