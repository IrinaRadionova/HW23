import {Component, Input} from '@angular/core';
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: ProductType;

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
    // this.getText();
  }

  // getText() {
  //   let text = document.getElementById('card-text');
  //   if (text) {
  //     console.log(text.innerText)
  //   }
  //
  // }

}
