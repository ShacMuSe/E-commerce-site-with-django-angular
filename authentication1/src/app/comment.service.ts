
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api/comments'; 

  constructor(private http: HttpClient) { }

  getComments(productId: number): Observable<Comment[]> {
    const url = `http://localhost:8000/api/shop/products/${productId}/comments/`;
    return this.http.get<Comment[]>(url);
  }

  addComment(productId: number, userId: number, content: string): Observable<any> {
    const url = `http://localhost:8000/api/shop/products/${productId}/comments/`;
    const payload = {
      product: productId,// ma3andich user id .......
      user: userId,
      content: content,
      created_at: new Date().toISOString()
    };
    return this.http.post<any>(url, payload);
  }

  deleteComment(commentId: number): Observable<any> {
    const url = `http://localhost:8000/api/comments/${commentId}`;
    return this.http.delete<any>(url);
  }
}
