import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  createdOrder: boolean = true;
  orderError: boolean = false;
  private subscriptionOrder: Subscription | null = null;


  checkoutForm = this.fb.group({
    productTitle: ['', [Validators.required], ],
    name: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[а-яА-Яa-zA-Z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^(\\+?)(\\d{11})')]],
    country: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я0-9\\s\\/\\-]+')]],
    comment: [''],
  })

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productService: ProductService) { }


  ngOnInit(): void {
    const productParam = this.activatedRoute.snapshot.queryParamMap.get('product');
    if (productParam) {
      this.checkoutForm.get('productTitle')?.disable();
      this.checkoutForm.patchValue({
        productTitle: productParam,
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder(): void {
    const formValues = this.checkoutForm.getRawValue();

    // const productTitle = this.checkoutForm.get('productTitle')?.value;
    // const name = this.checkoutForm.get('name')?.value;
    // const lastName = this.checkoutForm.get('lastName')?.value;
    // const phone = this.checkoutForm.get('phone')?.value;
    // const country = this.checkoutForm.get('country')?.value;
    // const zipCode = this.checkoutForm.get('zipCode')?.value;
    // const address = this.checkoutForm.get('address')?.value;

    let comment = this.checkoutForm.get('comment')?.value;
    if (!comment) {
      comment = '';
    }
    if (formValues) {
      this.subscriptionOrder = this.productService.createOrder({
        name: formValues.name!,
        last_name: formValues.lastName!,
        phone: formValues.phone!,
        country: formValues.country!,
        zip: formValues.zipCode!,
        product: formValues.productTitle!,
        address: formValues.address!,
        comment: comment,
      })
        .pipe(
          tap(()=> {
            this.checkoutForm.get('productTitle')?.disable();
          })
        )
        .subscribe(response => {
          if (response.success && !response.message) {
            this.createdOrder = false;
          } else {
            this.orderError = true;
          }
        })
    }
  }
}
