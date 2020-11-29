import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'; 

interface Pedidos {
  id: number;
}

interface Pedidos_detail {
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

  private pedidos: Pedidos[] = [];
  private pedidos_detail: Pedidos_detail[] = [];

  constructor(private storage: Storage) {
    this.fetchPedidos();
   }

  private async fetchPedidos(){
    this.pedidos = (await this.storage.get('pedidos')) ?? [];
    this.pedidos_detail = (await this.storage.get('pedidos_detail')) ?? [];
    if (Array.isArray(this.pedidos) && this.pedidos.length === 0){
      this.orderIsEmpty = true;
    }else{
      this.orderIsEmpty = false;
    }
  }

  public async updateStorage(){
    this.storage.set('pedidos', this.pedidos);
    this.storage.set('pedidos_detail', this.pedidos_detail);
  }

  public Pedido(){
    return this.pedidos;
  }

  public itensPedido(){
    return this.pedidos_detail;
  }

  public addPedido(id: number){
    this.pedidos.push({id});
  }

  public addToPedido(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.pedidos_detail.push({id, productId, productName, purchaseQtd, total});
  }

  public productExists(productId: number){
    return this.pedidos_detail.some(el => el.productId === productId);
  }
}