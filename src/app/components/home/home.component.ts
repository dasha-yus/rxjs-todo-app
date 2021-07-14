import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newTodo: string = '';
  todos = [
    {
      id: 1,
      title: 'first todo',
      completed: false,
    },
    {
      id: 2,
      title: 'second todo',
      completed: false,
    },
    {
      id: 3,
      title: 'third todo',
      completed: false,
    },
    {
      id: 4,
      title: 'fourth todo',
      completed: false,
    },
    {
      id: 5,
      title: 'todo number five',
      completed: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({
        id: 6,
        title: this.newTodo.trim(),
        completed: false,
      });
      this.newTodo = '';
    }
  }

  removeTodo(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }
  }

  toggleTodo(id) {
    let index = this.todos.findIndex((todo) => todo.id == id);
    this.todos[index].completed = !this.todos[index].completed;
  }
}
