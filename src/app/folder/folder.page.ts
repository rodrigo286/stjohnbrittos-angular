import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Category } from '../models/categorys';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { CarrinhoService } from '../services/carrinho.service';
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
  public itensNoCarrinho: boolean = false;

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
    console.log('Encontrado !');
  }

  public addToCarrinho(){
    let found = this.carrinhoService.productExists(this.product[0].productId);

    this.actualQuantity += this.quantity;
    /*if(this.actualQuantity < 0)
      this.actualQuantity = 0;*/

    if(this.actualQuantity <= 0){
      this.carrinho.pop();
      this.actualQuantity = 0;
      //this.itensNoCarrinho = false;
      this.carrinhoService.cartEmpty(false);
    }

    if (!found && this.quantity > 0){
      this.carrinhoService.addToCarrinho(this.carrinho.length + 1, this.product[0].productId, this.product[0].productName, this.quantity, (this.quantity *this.product[0].price));
      this.carrinhoService.cartEmpty(true);
    }else{
      this.carrinhoService.plusQuantity(this.quantity, this.product[0].price);
      this.carrinhoService.cartEmpty(true);
    }

    this.carrinhoService.updateStorage();

    //this.Routes.navigate(['folder/Carrinho']);
    //this.Routes.navigateByUrl('folder/Carrinho');
  }

  constructor(private activatedRoute: ActivatedRoute, private Routes: Router, private shopService: ShopService, private http : HttpClient, private carrinhoService: CarrinhoService) { }

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

    setTimeout(() => {
       this.carrinho = this.carrinhoService.itensCarrinho();
       //this.carrinhoService.cartEmpty(true);
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
