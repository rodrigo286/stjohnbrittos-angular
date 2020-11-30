import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from '../models/categorys';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  url = 'https://stjohnbrittos.tk/public/index.php/api/';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCategorys(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + 'categorys')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getCatById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.url + 'categoryById/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProductsByCat(id: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + 'productsByCat/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + 'productById/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  /*addPurchase(id: number, productId: number, productName: string, purchaseQtd: number, price: number): Observable<Purchase> {
    purchaseQtd
  }*/

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
