import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { CarrinhoService } from '../services/carrinho.service';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public productCat: number;
  public productId: number;

  public quantity: number = 1;
  public actualQuantity: number = 0;
  public cartIsEmpty: boolean = false;
  public orderIsEmpty: boolean = false;

  public formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  });

  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;

  public addQuantity(){
    this.quantity++;
    if(this.quantity === 0)
      this.quantity = 1;
  }

  public remQuantity(){
    this.quantity--;
    if(this.quantity === 0)
      this.quantity = -1;
  }

  public carrinho;
  public pedidos;
  public pedidosTotal;
  public pedidosDetail;

  /*public pedidos = [];
  public pedidoTotal = [];
  public pedidos_detail = [];*/

  public check(){
    /*for (let pedido of this.pedidos){
      console.log('Pedido: ' + pedido.id);
      let total = 0;
      for (let i = 0; i < this.pedidos_detail.length; i++){
        if(pedido.id == this.pedidos_detail[i].id){
          total += this.pedidos_detail[i].total;
          console.log(this.pedidos_detail[i]);
        }
      }
      console.log('Total: ' + total);
    }*/
  }

  public storeToPedidos(){
    const id = this.pedidosDetail.length + 1;

    for (let i = 0; i < this.carrinho.length; i++) {
      let found = this.pedidoService.productExists(this.carrinho[i].productId);

      const productId = this.carrinho[i].productId;
      const productName = this.carrinho[i].productName;
      const purchaseQtd = this.carrinho[i].purchaseQtd;
      const total = this.carrinho[i].total;

      console.log('I: ' + i);
      console.log('ID: ' + id);
      console.log('ProductId: ' + productId);
      console.log('ProductName: ' + productName);
      console.log('PurchaseQtd: ' + purchaseQtd);
      console.log('Total: ' + total);

      /*if (!found){
        this.pedidoService.addToPedido(id, productId, productName, purchaseQtd, total);
        this.carrinho.pop();
        this.actualQuantity = 0;
      }else{
        this.actualQuantity = 0;
      }*/
    }

    //window.location.replace("/folder/Meus-pedidos");
    //this.pedidoService.updateStorage();
  }

  public addToCarrinho(){
    let found = this.carrinhoService.productExists(this.product[0].productId);

    this.actualQuantity += this.quantity;

    if(this.actualQuantity <= 0){
      this.carrinho.pop();
      this.actualQuantity = 0;
    }

    if (!found && this.quantity > 0){
      this.carrinhoService.addToCarrinho(this.carrinho.length + 1, this.product[0].productId, this.product[0].productName, this.quantity, (this.quantity *this.product[0].price));
    }else{
      this.carrinhoService.plusQuantity(this.quantity, this.product[0].price);
    }

    this.carrinhoService.updateStorage();

    window.location.replace("/folder/Carrinho");
  }

  constructor(private activatedRoute: ActivatedRoute, private Routes: Router, private shopService: ShopService, private http : HttpClient, private carrinhoService: CarrinhoService, private pedidoService: PedidosService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('dir');
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productCat = +this.activatedRoute.snapshot.paramMap.get('cat');

    this.getCategorys();

    if(this.productCat && this.folder === 'produtos') {
      this.getCatById(this.productCat);
      this.getProductsByCat(this.productCat);
    }else if(this.productId && this.folder === 'produto'){
      this.getCatById(this.productCat);
      this.getProductById(this.productId);
    }

    setTimeout(() => {
       this.carrinho = this.carrinhoService.itensCarrinho();
       this.pedidos = this.pedidoService.Pedido();
       this.pedidosDetail = this.pedidoService.itensPedido();
       this.cartIsEmpty = this.carrinhoService.cartIsEmpty === true ? true : false;
       this.orderIsEmpty = this.pedidoService.orderIsEmpty === true ? true : false;
    }, 1000)

    /*this.pedidos = [
      {'id': 0},
      {'id': 1},
      {'id': 2}
    ];

    this.pedidos_detail = [
      {'id': 0, 'productId': 0, 'productName': 'TESTE 0', 'purchaseQtd': 5, 'total': 20},
      {'id': 1, 'productId': 1, 'productName': 'TESTE 1', 'purchaseQtd': 5, 'total': 8},
      {'id': 0, 'productId': 2, 'productName': 'TESTE 2', 'purchaseQtd': 5, 'total': 15.5},
      {'id': 2, 'productId': 3, 'productName': 'TESTE 3', 'purchaseQtd': 5, 'total': 20}
    ];

    for (let pedido of this.pedidos){
      this.pedidoTotal[pedido.id] = 0;
      for (let i = 0; i < this.pedidos_detail.length; i++)
        if(pedido.id == this.pedidos_detail[i].id)
          this.pedidoTotal[pedido.id] += this.pedidos_detail[i].total;
    }*/

    /*for (let total of this.pedidoTotal)
      console.log(total);*/
  }

  getCategorys() {
    this.shopService.getCategorys().subscribe((cats: Category[]) => {
      this.categorys = cats;
    });
  }

  getCatById(id: number){
    this.shopService.getCatById(id).subscribe((cate: Category) => {
      this.category = cate;
    });
  }

  getProductsByCat(id: number) {
    this.shopService.getProductsByCat(id).subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getProductById(id: number) {
    this.shopService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
    });
  }
}
