import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  rating: number = 0;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        
        this.products = this.products.filter(product => product.id !== productId);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }


  goToEditPage(productId: number) {
    this.router.navigate(['products', productId, 'edit']);
  }

  goToCommentPage(productId: number) {
    this.router.navigate(['products', productId, 'comment']);
  }


  submitRating(productId: number, rating: number): void {
    this.productService.rateProduct(productId, rating).subscribe(
      (data) => {
        console.log('Rating submitted successfully:', data);
        this.getProducts();
      },
      (error) => {
        console.error('Error submitting rating:', error);
      }
    );
  }
}