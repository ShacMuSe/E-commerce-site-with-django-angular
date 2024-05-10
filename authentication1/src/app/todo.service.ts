import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Task } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8000/api/todos/';

  constructor(private http: HttpClient) { }


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${task.id}/`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl+'delete/'}${id}`);
  }
}
