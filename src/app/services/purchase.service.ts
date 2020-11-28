import { Injectable } from '@angular/core';

interface Purchase {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchase: Purchase[] = [];

  public itensPurchase(){
    return this.purchase;
  }

  constructor() { }

  public addPurchase(productId: number, productName: string, quantity: number, price: number){
    this.purchase.push({productId, productName, quantity, price});
  }

  public plusQuantity(quantity: number, price: number){
    this.purchase.some(el => el.quantity += quantity);
    this.purchase.some(el => el.price += (quantity * price));
  }

  public productExists(productId: number){
    return this.purchase.some(el => el.productId === productId);
  }
}
