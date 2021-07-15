import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { StoreService } from '../../store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newTodo = '';
  todos$: Observable<Array<Todo>>;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.init();
    this.todos$ = this.store.getAllTodos()
  }

  addTodo() {
    this.store.addTodo(this.newTodo);
    this.newTodo = '';
  }

  removeTodo(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.store.deleteTodo(id);
    }
  }

  toggleTodo(id) {
    this.store.toggleTodo(id);
  }
}