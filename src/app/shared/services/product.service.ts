import {Injectable} from "@angular/core";
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + 'tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `tea?id=${id}`);
  }

  createOrder(data: {product: string, name: string, last_name: string, phone: string, country: string, zip: string,
    address: string, comment: string}) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `order-tea`, data);
  }

}
