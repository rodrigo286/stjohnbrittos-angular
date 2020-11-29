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
    this.fetchPedido();
   }

  private async fetchPedido(){
    this.pedidos_detail = (await this.storage.get('pedido')) ?? [];
    if (Array.isArray(this.pedidos_detail) && this.pedidos_detail.length === 0){
      this.orderIsEmpty = true;
    }else{
      this.orderIsEmpty = false;
    }
  }

  groupArr = this.pedidos_detail.reduce((r,{id})=>{
    if(!r.some(o=>o.id==id)){
      r.push({id,groupItem:this.pedidos_detail.filter(v=>v.id==id)});
}
return r;
},[]);

  public async updateStorage(){
    this.storage.set('pedido', this.pedidos_detail);
  }

  public itensPedido(){
    return this.pedidos_detail;
  }

  public addToPedido(id: number, productId: number, productName: string, purchaseQtd: number, total: number){
    this.pedidos_detail.push({id, productId, productName, purchaseQtd, total});
  }

  public productExists(productId: number){
    return this.pedidos_detail.some(el => el.productId === productId);
  }
}