import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  page:number = 1;
  products:any = [];
  carts: any =  [];
  userFilter: any = { name: '' };
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });
  priceFormSearch: FormGroup = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('')
  });

  minPrice: number = 0;
  maxPrice: number = 0;
  filteredProducts:any = [];

  constructor(
    private app:AppService,
    private heartService: HeartService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.fetchProductAPI();
  }

  darkMode = false;

  toggleTheme(){
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
  }

  filterProductsByPrice() {
    this.products = this.products.filter((product:any) =>
      product.price >= this.minPrice && product.price <= this.maxPrice
    );

    console.log(this.products)
  }

  fetchProductAPI() {
    this.app.getProduct().subscribe(response => {
      this.products = response;
    });
  }

  submitSearch() {
    let data = this.productFormSearch.value.name
    this.app.searchProduct(data).subscribe((response: any) => {
      this.products = response;
    })
  }

  searchByMoney(){
    let start = this.priceFormSearch.value.start;
    let end = this.priceFormSearch.value.end;

    console.log(this.products)


  }

  onFavorite(product: number) {
    console.log(product)
    Swal.fire(
      '',
      'Add to heart successfully !',
      'success'
    )
    this.heartService.postHeart(product).subscribe(response=>{
      this.heartService.getHeart().subscribe(data=>{
        console.log(data)
      })
    })
  }
  onAddToCart(product: any) {
    let idx = this.carts.findIndex((item: any) => item.id === product.id)
    console.log(product)
    if (idx >= 0) {
      this.carts[idx].quantity += 1;
    } else {

      let cartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity
        }
      }
      Swal.fire(
        '',
        'Add to cart successfully !',
        'success'
      )
      this.carts.push(cartItem)
    }
    //save storage
    this.app.saveCart(this.carts)
    console.log(this.carts);

  }

  getDetailProduct(id:number){
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }
}
