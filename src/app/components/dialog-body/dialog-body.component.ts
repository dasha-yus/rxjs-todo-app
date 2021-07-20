import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private dialog: MatDialog,
    private todosService: StoreService
  ) {}

  onClose() {
    this.dialog.closeAll();
  }

  onSave() {
    this.todosService.editTodo(this.data.id, this.data.title);
    this.dialog.closeAll();
  }
}