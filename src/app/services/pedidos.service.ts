import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'; 

interface Pedido {
  id: number;
  productId: number;
  productName: string;
  purchaseQtd: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedido: Pedido[] = [];

  constructor(private storage: Storage) {
    this.fetchPedido();
   }

  private async fetchPedido(){
    this.pedido = (await this.storage.get('pedido')) ?? [];
  }

  public async updateStorage(){
    this.storage.set('pedido', this.pedido);
  }

  public itensCarrinho(){
    return this.pedido;
  }

  public addToCarrinho(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.pedido.push({id, productId, productName, purchaseQtd, total});
  }

  public productExists(productId: number){
    return this.pedido.some(el => el.productId === productId);
  }
}