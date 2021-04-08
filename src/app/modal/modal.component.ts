
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any ) { }

  title = '';
  description = '';
  genres = '';
  ngOnInit() {
    this.title = this.data.title;
    this.description = this.data.description;
    this.genres = this.data.genres;
    console.log(this.data.title, this.data);
    
  }

}
