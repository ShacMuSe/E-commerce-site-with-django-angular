import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number=0;
  product!: Product;
  updatedProductData: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct();
    });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe(
      product => {
        this.product = product;
        // Initialize updatedProductData with current product data
        this.updatedProductData = { ...product };
      },
      error => {
        console.error('Error fetching product:', error);
      }
    );
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.updatedProductData).subscribe(
      updatedProduct => {
        this.product = updatedProduct;
        // Optionally, display a success message or navigate to another page
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }
}
