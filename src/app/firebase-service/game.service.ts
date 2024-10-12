import {
  inject,
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService implements OnDestroy {

  unsubGame;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubGame = onSnapshot(doc(this.firestore, 'game', 'game'), (doc) => {

      console.log(doc.data());

    })
  }


  ngOnDestroy(): void {
    if (this.unsubGame) {
      this.unsubGame();
    }
  }
}