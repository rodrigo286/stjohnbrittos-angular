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

  public orderIsEmpty: boolean = false;

  private pedido: Pedido[] = [];

  constructor(private storage: Storage) {
    this.fetchPedido();
   }

  private async fetchPedido(){
    this.pedido = (await this.storage.get('pedido')) ?? [];
    if (Array.isArray(this.pedido) && this.pedido.length === 0){
      this.orderIsEmpty = true;
    }else{
      this.orderIsEmpty = false;
    }
  }

  public async updateStorage(){
    this.storage.set('pedido', this.pedido);
  }

  public itensPedido(){
    return this.pedido;
  }

  public addToPedido(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.pedido.push({id, productId, productName, purchaseQtd, total});
  }

  public productExists(productId: number){
    return this.pedido.some(el => el.productId === productId);
  }
}