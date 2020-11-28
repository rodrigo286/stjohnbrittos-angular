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
}
