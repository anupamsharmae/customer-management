import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
  ) { }

  ngOnInit(): void {
  }

  onConfirm(){
    this.dialogRef.close(this.data.id);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
