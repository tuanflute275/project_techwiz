import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { HeartService } from 'src/app/services/heart.service';
import { Options, LabelType } from 'ng5-slider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  page: number = 1;
  pageSize: number = 9;
  results: number = 1;
  products: any = [];
  carts: any = [];
  favs: any = [];
  categories: any = [];
  userFilter: any = { name: '' };
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  minPrice: number = 0;
  maxPrice: number = 0;
  filteredProducts: any = [];

  constructor(
    private app: AppService,
    private heartService: HeartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProductAPI();
    this.getListCategory();
  }

  // Slider Options
  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice = value;

          return '<b>Min price:</b> Rs. ' + value;
        case LabelType.High:
          this.maxPrice = value;
          return '<b>Max price:</b> Rs. ' + value;
        default:
          return 'Rs. ' + value;
      }
    },
  };

  // END Slider Options

  darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
  }

  getListCategory() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);
      this.categories = res.category;
    });
  }

  fetchProductAPI() {
    this.app.getData().subscribe((res: any) => {
      console.log(res);

      this.products = res.product;
    });
  }

  filterProductsByPrice() {
    console.log('Min: ' + this.minPrice + ' Max: ' + this.maxPrice);

    this.products = this.products.filter((prod: any) => prod.price > this.minPrice && prod.price < this.maxPrice);
  }

  sortBy(name_sort: string, type_sort: string) {
    console.log({
      name_sort,
      type_sort
    });

    let compare = (a: any, b: any) => {
      if (name_sort == "name") {
        return (type_sort == "desc") ? (a.name - b.name) : (b.name - a.name);
      }
      if (name_sort == "price") {
        return (type_sort == "desc") ? (a.price - b.price) : (b.price - a.price);
      }
      return b.id - a.id;
    };
    this.products = this.products.sort(compare);

  }

  handlePerPage(perPage: number) {
    console.log(perPage);
    this.pageSize = perPage;
  }

  reset() {
    this.fetchProductAPI();
  }

  onFavorite(product: any) {
    this.favs = localStorage.getItem('heart') ? JSON.parse(localStorage.getItem('heart') as any) : [];
    let idx = this.favs.findIndex((item: any) => item.id === product.id);
    console.log(product);
    if (idx >= 0) {
      this.favs.splice(idx, 1);
      localStorage.setItem('heart', JSON.stringify(this.favs));
      Swal.fire('', 'Remove From favourite successfully !', 'success');
    } else {
      let heartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price
      };
      Swal.fire('', 'Add to favourite successfully !', 'success');
      this.favs.push(heartItem);
      //save storage
      localStorage.setItem('heart', JSON.stringify(this.favs));
    }
  }
  onAddToCart(product: any) {
    this.carts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as any) : [];
    let idx = this.carts.findIndex((item: any) => item.id === product.id);
    console.log(product);
    if (idx >= 0) {
      this.carts[idx].quantity += 1;
      this.app.saveCart(this.carts);
      Swal.fire('', 'Add to cart successfully !', 'success');
    } else {
      let cartItem: any = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.sale_price ? product.sale_price : product.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity;
        },
      };
      Swal.fire('', 'Add to cart successfully !', 'success');
      this.carts.push(cartItem);
          //save storage
    this.app.saveCart(this.carts);
    }

    console.log(this.carts);
  }

  getDetailProduct(id: number) {
    console.log(id);
    this.router.navigate([`/productDetail/${id}`]);
  }
}
