import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  private URL = 'https://jsonplaceholder.typicode.com/todos';
  public todos: Array<Todo> = [];
  private subject = new BehaviorSubject<Array<Todo>>([]);
  public todos$ = this.subject.asObservable();

  getTodos(limit: number) {
    return this.httpClient.get<Array<Todo>>(`${this.URL}?_limit=${limit}`).pipe(
      map((fetchedTodos: Todo[]) => {
        this.todos = fetchedTodos;
        this.subject.next(this.todos);
        return true;
      }),
      catchError((err) => {
        alert(err.message);
        return of(false);
      })
    );
  }

  onToggle(id: number) {
    let index = this.todos.findIndex((todo) => todo.id == id);
    this.todos[index].completed = !this.todos[index].completed;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.subject.next(this.todos);
  }

  addTodo(todoTitle: string) {
    const todo: Todo = {
      id: uuidv4(),
      title: todoTitle.trim(),
      completed: false,
    };
    if (todoTitle.trim() !== '') {
      this.todos = [...this.todos, todo];
      this.subject.next(this.todos);
    }
  }

  editTodo(id: number, title: string) {
    let index = this.todos.findIndex((todo) => todo.id == id);
    this.todos[index].title = title;
  }
}

