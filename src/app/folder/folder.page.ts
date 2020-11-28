import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { stringify } from 'querystring';
//import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public productCat: number;
  public productId: number;

  //category = {} as Category;
  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;
  purchase:any = [];

  public formatter = new Intl.NumberFormat('pt-BR', {
    //style: 'currency',
    minimumFractionDigits: 2,
    //currency: 'BRL',
  });

  public quantity: number = 1;

  public addQuantity(){
    this.quantity++;
    if(this.quantity === 0)
      this.quantity = 1;
  }

  public remQuantity(){
    //if(this.quantity > 1)
    this.quantity--;
    if(this.quantity === 0)
      this.quantity = -1;
  }

  public addPurchase(){
    const {length} = this.purchase;
    const id = length + 1;
    const found = this.purchase.some(el => el.productId === this.product[0].productId);

    const sqtd = this.purchase.some(el => el.purchaseQtd);

    const nQtd = this.quantity + sqtd;

    if(nQtd < 0)
      this.purchase.pop();

    if (!found && this.quantity > 0){
      this.purchase.push({id: this.purchase.length-1 + 1, productId: this.product[0].productId, productName: this.product[0].productName, purchaseQtd: this.quantity, price: (this.quantity * this.product[0].price)});
    }else{
      this.purchase.some(el => el.purchaseQtd += this.quantity);
      this.purchase.some(el => el.price += (this.quantity * this.product[0].price));
    }

    const qtd = this.purchase.some(el => el.purchaseQtd);

    if(qtd < sqtd || qtd < 0)
      this.purchase.pop();
  }

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private http : HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('dir');
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productCat = +this.activatedRoute.snapshot.paramMap.get('cat');

    //this.purchase.push({id: 0, productId: 10, productName: 'TESTE', purchaseQtd: 1, price: 1});

    /*let valor = 5;

    const { length } = this.purchase;
    const id = length + 1;
    const found = this.purchase.some(el => el.productId === 11);
    if (!found){
      this.purchase.push({id: 1, productId: 10, productName: 'TESTE', purchaseQtd: 1, price: 5});
    }else{
      this.purchase.some(el => el.purchaseQtd++);
      this.purchase.some(el => el.price += valor);
    }

    console.log(this.purchase);*/

    this.getCategorys();

    if(this.productCat && this.folder === 'produtos') {
      this.getCatById(this.productCat);
      this.getProductsByCat(this.productCat);
    }else if(this.productId && this.folder === 'produto'){
      this.getCatById(this.productCat);
      this.getProductById(this.productId);
      console.log('Folder: ' + this.folder);
      console.log('Product: ' + this.productId);
      console.log('Cat: ' + this.productCat);
    }
  
  }

  public teste(){
    console.log('Load sucesso.');
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
