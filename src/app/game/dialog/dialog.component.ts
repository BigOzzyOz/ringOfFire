import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../game.component';
import { Game } from '../../../models/game';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule,],
})


export class DialogOverviewExampleDialog {
  game: Game = new Game;
  name: string = '';


  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public cdr: ChangeDetectorRef) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
