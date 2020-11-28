import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { CarrinhoService } from '../services/carrinho.service';
import { PurchaseService } from '../services/purchase.service';

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

  public carrinho;
  public purchase;
  //public addToCarrinho = '';

  public formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  });


  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;

  /*public addToCarrinho(){
    this.carrinhoService.addToCarrinho(this.carrinho.length + 1, this.purchase.productId, this.purchase.productName, this.purchase.purchaseQtd, this.purchase.price);
  }*/

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

  public check(){
    let found = this.purchaseService.productExists(this.product[0].productId);
    if(found)
      console.log('Encontrado !');
  }

  public addPurchase(){
    let found = this.purchaseService.productExists(this.product[0].productId);

    this.actualQuantity += this.quantity;
    if(this.actualQuantity < 0)
      this.actualQuantity = 0;

    if(this.actualQuantity <= 0){
      this.purchase.pop();
      this.actualQuantity = 0;
    }

    if (!found && this.quantity > 0){
      this.purchaseService.addPurchase(this.product[0].productId, this.product[0].productName, this.quantity, (this.quantity * this.product[0].price));
    }else{
      this.purchaseService.plusQuantity(this.quantity, this.product[0].price); ;
    }

    //this.addToCarrinho();
  }

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private http : HttpClient, private carrinhoService: CarrinhoService, private purchaseService: PurchaseService) { }

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
      /*console.log('Folder: ' + this.folder);
      console.log('Product: ' + this.productId);
      console.log('Cat: ' + this.productCat);*/
    }

    this.carrinho = this.carrinhoService.itensCarrinho();
    this.purchase = this.purchaseService.itensPurchase();
  
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
