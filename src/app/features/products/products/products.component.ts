import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductType[] = [];
  private subscription: Subscription | null = null;

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
