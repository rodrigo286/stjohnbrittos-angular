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
  public folder: string;
  public area: string;
  public value: number;

  //category = {} as Category;
  categorys: Category[];
  category: Category;
  products: Product[];
  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private http : HttpClient) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.value = +this.activatedRoute.snapshot.paramMap.get('value');

    this.getCategorys();

    if(this.value && this.folder === 'produtos') {
      this.getCatById(this.value);
      this.getProductsByCat(this.value);
    }else if(this.value && this.folder === 'produto'){
      this.getProductById(this.value);
    }
  
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
      //console.log(product);
    });
  }
}
