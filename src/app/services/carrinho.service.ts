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

  private carrinho: Carrinho[] = [];

  public itensCarrinho(){
    return this.carrinho;
  }

  constructor(private storage: Storage) { }

  public addToCarrinho(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.carrinho.push({id, productId, productName, purchaseQtd, total});
  }
}
