import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Task, TaskDto} from "./interfaces";
import todos from "./todos-data";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList: WritableSignal<Task[]> = signal<Task[]>([]);

  constructor() {
    this.todoList.set(todos);
  }

  getAll(): Signal<Task[]> {
    return this.todoList.asReadonly();
  }

  getOne(id: number): Signal<Task | undefined> {

    const todo = this.todoList().find(todo => todo.id === id);

    return signal<Task | undefined>(todo).asReadonly();
  };

  create(taskDto: TaskDto): void {
    const {title, description} = taskDto;

    const todoId = this.generateId();

    const newTask = {
      title,
      description,
      id: todoId,
      completed: false,
    }

    this.todoList.update(preTodoListValue => [...preTodoListValue, newTask]);
  };

  update(taskId: number, taskDto: TaskDto): void {
    const {title, description} = taskDto;

    const updatedTodoList = this.todoList().map(todo => {
      if (todo.id === taskId) {
        return {
          ...todo,
          title,
          description,
        }
      }

      return todo;
    });

    this.todoList.set(updatedTodoList);
  };

  delete(id: number): void {
    const filteredTodoList = this.todoList().filter(todo => todo.id !== id);

    this.todoList.set(filteredTodoList);
  };

  toggleCompleted(id: number): void {

    const updatedTodoList = this.todoList().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo;
    });

    this.todoList.set(updatedTodoList);
  }


  private generateId() {

    const todoListIds = this.todoList().map(todo => todo.id);

    return Math.max(...todoListIds) + 1;
  }
}
