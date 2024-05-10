import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  productId: number=0;
  productName: string= '';
  userEmail: string= '';
  product!: any;
  comments: any[] = [];
  newCommentText: string = '';
  userId: number=0;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private productService: ProductService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.apiService.getUser().subscribe(userEmail => {
        this.userEmail = userEmail;
      });
      this.loadProduct();
      this.loadComments();
    });
  }


  loadProduct() {
    this.productService.getProductById(this.productId).subscribe(
      product => {
        this.product = product;
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  loadComments() {
    this.commentService.getComments(this.productId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  addComment() {
    if (!this.newCommentText.trim()) {
      return; // Prevent adding empty comments
    }

    this.commentService.addComment(this.productId, this.userId, this.newCommentText).subscribe(
      () => {
        this.loadComments(); // Reload comments after adding a new one
        this.newCommentText = ''; // Clear input field
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error => {
        console.error('Error deleting comment:', error);
      }
    );
  }
}