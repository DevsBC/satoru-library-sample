import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Confirm } from '../../interfaces/confirm.interface';

@Component({
  selector: 'sat-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(public dialog: MatDialogRef<any>,  @Inject(MAT_DIALOG_DATA) public data: Confirm) { }

  public confirm(): void {
    this.dialog.close(true);
  }

}
