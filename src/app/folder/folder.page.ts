import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Product } from '../models/product';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  /*public folder: string;
  public productCat: number;
  public value: number;*/
  public folder: string;
  public productCat: number;
  public productId: number;

  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;

  /*public purchaseId: number;
  public purchaseQtd: number;*/

  public purchase = [
    {
      id: 0,
      productId: 0,
      productName: '',
      purchaseQtd: 0,
      price: 0
    }
  ];

  public quantity: number = 1;

  /*public addPurchase(id, name, qtd, price){
    this.purchase.push({id: this.purchase.length + 1, productId: id, productName: name, purchaseQtd: qtd, price: price});
  }*/

  public addQuantity(){
    this.quantity++;
  }

  public remQuantity(){
    if(this.quantity > 1)
      this.quantity--;
  }

  public addPurchase(){
    //this.getProductById(this.productId);
    this.purchase.push({id: this.purchase.length + 1, productId: this.product[0].productId, productName: this.product[0].productName, purchaseQtd: this.quantity, price: this.product[0].price});
  }

  //category = {} as Category;
  /*categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;*/

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private http : HttpClient) { }

  ngOnInit() {
    /*this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.value = +this.activatedRoute.snapshot.paramMap.get('value');
    this.productCat = +this.activatedRoute.snapshot.paramMap.get('cat');*/
    this.folder = this.activatedRoute.snapshot.paramMap.get('dir');
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productCat = +this.activatedRoute.snapshot.paramMap.get('cat');

    this.getCategorys();

    /*if(this.value && this.folder === 'produtos') {
      this.getCatById(this.value);
      this.getProductsByCat(this.value);
    }else if(this.value && this.folder === 'produto'){
      //this.getCatById(this.persistentCat);
      this.getProductById(this.value);
      console.log('Folder: ' + this.folder);
      console.log('Value: ' + this.value);
      console.log('Cat: ' + this.productCat);
    }*/
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
      //console.log(product[0]);
      //console.log('Cat: ' + product);
    });
  }
}
