import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'; 

interface Carrinho {
  id: number;
  productId: number;
  productName: string;
  purchaseQtd: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private cartIsEmpty: boolean = false;

  private carrinho: Carrinho[] = [];

  constructor(private storage: Storage) {
   this.fetchCarrinho();
   this.fetchCartEmpty();
  }

  private async fetchCarrinho(){
    this.carrinho = (await this.storage.get('carrinho')) ?? [];
  }

  private async fetchCartEmpty(){
    this.cartIsEmpty = (await this.storage.get('cartIsEmpty')) ?? [];
  }

  public async updateStorage(){
    this.storage.set('carrinho', this.carrinho);
    this.storage.set('cartIsEmpty', this.cartIsEmpty);
  }

  public itensCarrinho(){
    return this.carrinho;
  }

  public cartEmpty(cond: boolean){
    this.cartIsEmpty = cond;
  }

  public addToCarrinho(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.carrinho.push({id, productId, productName, purchaseQtd, total});
    //this.updateStorage();
  }

  public plusQuantity(quantity: number, price: number){
    this.carrinho.some(el => el.purchaseQtd += quantity);
    this.carrinho.some(el => el.total += (quantity * price));
  }

  public productExists(productId: number){
    return this.carrinho.some(el => el.productId === productId);
  }
}
