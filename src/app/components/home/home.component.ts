import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { StoreService } from '../../store.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fetchData$: Observable<boolean>;
  todos$: Observable<Todo[]>;
  newTodo: string = '';
  title = 'Example Angular 10 Material Dialog';

  constructor(private todosService: StoreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData$ = this.todosService.getTodos(5);
    this.todos$ = this.todosService.todos$;
  }

  addTodo() {
    this.todosService.addTodo(this.newTodo);
    this.newTodo = '';
  }

  removeTodo(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.todosService.removeTodo(id);
    }
  }

  onToggle(id: number) {
    this.todosService.onToggle(id);
  }

  openDialog(id, title) {
    this.dialog.open(DialogBodyComponent, {
      data: { id: id, title: title },
    });
  }
}
