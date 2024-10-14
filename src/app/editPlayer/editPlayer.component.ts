import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../game/game.component';
import { MatRadioModule } from '@angular/material/radio';



@Component({
  selector: 'app-editPlayer',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule, MatRadioModule],
  templateUrl: './editPlayer.component.html',
  styleUrl: './editPlayer.component.scss'
})
export class EditPlayerComponent {

  name: string;
  image: string;
  allProfilePictures: string[] = ['1.webp', '2.png', 'monkey.png', 'winkboy.svg', 'serious-woman.svg']

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public cdr: ChangeDetectorRef) {
    this.name = data.name;
    this.image = data.image;
  }


  selectImage(img: string) {
    this.image = img;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
