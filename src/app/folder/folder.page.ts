import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public productCat: number;
  public productId: number;

  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;
  purchase:any = [];

  public formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  });

  public quantity: number = 1;
  public actualQuantity: number = 0;

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

  public addPurchase(){
    const {length} = this.purchase;
    const found = this.purchase.some(el => el.productId === this.product[0].productId);

    this.actualQuantity += this.quantity;
    if(this.actualQuantity < 0)
      this.actualQuantity = 0;

    if(this.actualQuantity <= 0){
      this.purchase.pop();
      this.actualQuantity = 0;
    }

    if (!found && this.quantity > 0){
      this.purchase.push({id: this.purchase.length-1 + 1, productId: this.product[0].productId, productName: this.product[0].productName, purchaseQtd: this.quantity, price: (this.quantity * this.product[0].price)});
    }else{
      this.purchase.some(el => el.purchaseQtd += this.quantity);
      this.purchase.some(el => el.price += (this.quantity * this.product[0].price));
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private http : HttpClient) { }

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
