import { ApiService } from './../api.service';
// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../todo';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  errorLoadingTasks: string='';


  constructor(private taskService: TodoService, private apiService:ApiService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error loading tasks:', error);
        }
      );
  }

  createTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: 0,
        title: this.newTaskTitle,
        completed: false
      };
      this.taskService.createTask(newTask)
        .subscribe(
          task => {
            this.tasks.push(task);
            this.newTaskTitle = ''; // Clear input
          },
          error => {
            console.error('Error creating task:', error);
          }
        );
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
  }

  logout(){
    this.apiService.logout_user().subscribe(
      data => {
        console.log(data)
        this.router.navigate(['login'])
      },
      error => {
        console.error(error)
      }
    )
  }



  
}
