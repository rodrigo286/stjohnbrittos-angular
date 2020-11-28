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

  constructor(private storage: Storage) {
   this.fetchCarrinho();
  }

  private async fetchCarrinho(){
    this.carrinho = (await this.storage.get('carrinho')) ?? [];
    //this.carrinho.push(...(await this.storage.get('carrinho')));
    /*const storageCarrinho = await this.storage.get('carrinho');
    this.carrinho.push(...storageCarrinho);*/
  }

  private async updateStorage(){
    this.storage.set('carrinho', this.carrinho);
  }

  public itensCarrinho(){
    return this.carrinho;
  }

  public addToCarrinho(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.carrinho.push({id, productId, productName, purchaseQtd, total});
    this.updateStorage();
  }
}
