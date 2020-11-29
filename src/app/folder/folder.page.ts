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

  public addQuantityMenu(){
    if(this.quantity < 100)
     this.quantity++;
  }

  public remQuantityMenu(){
    if(this.quantity > 1)
      this.quantity--;
  }

  public carrinho;
  public pedidos = [];
  public pedidosTotal = [];
  public pedidosDetail = [];

  public check(id: number){
    console.log(id);
  }

  public storeToPedidos(){
    const id = this.pedidos.length + 1;

    this.pedidoService.addPedido(id);
    for (let i = 0; i < this.carrinho.length; i++) {
      const productId = this.carrinho[i].productId;
      const productName = this.carrinho[i].productName;
      const purchaseQtd = this.carrinho[i].purchaseQtd;
      const total = this.carrinho[i].total;

      this.pedidoService.addToPedido(id, productId, productName, purchaseQtd, total);
    }

    window.location.replace("/folder/Meus-pedidos");
    //this.carrinho.pop();
    this.actualQuantity = 0;
    //this.carrinhoService.updateStorage();
    //this.carrinho.pop();
    this.carrinhoService.wipeCarrinho();
    this.pedidoService.updateStorage();
    //window.location.replace("/folder/Meus-pedidos");
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
       for (let pedido of this.pedidos){
        this.pedidosTotal[pedido.id] = 0;
        for (let i = 0; i < this.pedidosDetail.length; i++)
          if(pedido.id == this.pedidosDetail[i].id)
            this.pedidosTotal[pedido.id] += this.pedidosDetail[i].total;
      }
    }, 1000)
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
