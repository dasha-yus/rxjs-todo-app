import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private subject = new BehaviorSubject<Array<Todo>>([]);

  todos$: Observable<Array<Todo>> = this.subject.asObservable();

  private URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpClient: HttpClient) {}

  public init() {
    this.httpClient.get(this.URL).subscribe((todos) => {
      this.subject.next(<Array<Todo>>todos);
    });
  }

  public getAllTodos() {
    return this.todos$.pipe(map((todos) => todos.slice(6, 11)));
  }

  public addTodo(newTodo: string) {
    const todo: Todo = {
      id: uuidv4(),
      title: newTodo.trim(),
      completed: false,
    };
    if (newTodo.trim() !== '') {
      // this.todos.push(todo);
    }
  }

  public toggleTodo(id) {
    // let index = this.todos.findIndex((todo) => todo.id == id);
    // this.todos[index].completed = !this.todos[index].completed;
  }

  public deleteTodo(id) {
    this.subject.next(this.subject.getValue().filter((todo) => todo.id !== id));
  }
}
